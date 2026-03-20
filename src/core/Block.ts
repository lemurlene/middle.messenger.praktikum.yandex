import { EventBus } from "./EventBus";

export type Props = Record<string, unknown>;

export type EventsMap = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export type BlockProps = Props & {
  events?: EventsMap;
};

export abstract class Block<P extends BlockProps = BlockProps> {
  private static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
  } as const;

  public readonly id: string;

  protected props: P;
  protected children: Record<string, Block | Block[]> = {};

  private eventBus: EventBus;
  private element: HTMLElement | null = null;
  private tagName: string;

  constructor(props: P = {} as P, tagName = "div") {
    this.id = `b_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    this.tagName = tagName;

    this.eventBus = new EventBus();
    this.props = this.makePropsProxy(props);

    this.registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  protected init(): void {}
  protected componentDidMount(): void {}
  protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }
  protected abstract render(): DocumentFragment;

  public getContent(): HTMLElement {
    if (!this.element) throw new Error("Block: element is not created");
    return this.element;
  }

  public setProps(next: Partial<P>): void {
    if (!next) return;
    const oldProps = { ...this.props };

    Object.assign(this.props, next);

    const shouldRender = this.componentDidUpdate(oldProps as P, this.props);
    if (shouldRender) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private registerEvents(bus: EventBus): void {
    bus.on(Block.EVENTS.INIT, this.onInit.bind(this));
    bus.on(Block.EVENTS.FLOW_RENDER, this.onRender.bind(this));
    bus.on(Block.EVENTS.FLOW_CDM, this.onCDM.bind(this));
  }

  private onInit(): void {
    this.element = document.createElement(this.tagName);
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private onCDM(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) child.forEach((c) => c.dispatchComponentDidMount());
      else child.dispatchComponentDidMount();
    });
  }

  private onRender(): void {
    if (!this.element) throw new Error("Block: element is not created");

    this._removeEvents();

    const fragment = this.render();

    this.element.innerHTML = "";
    this.element.append(fragment);

    this.mountChildren();

    this._addEvents();
  }

  private _addEvents(): void {
    const events = this.props.events;
    if (!events || !this.element) return;

    Object.entries(events).forEach(([eventName, handler]) => {
      if (!handler) return;
      this.element!.addEventListener(eventName, handler);
    });
  }

  private _removeEvents(): void {
    const events = this.props.events;
    if (!events || !this.element) return;

    Object.entries(events).forEach(([eventName, handler]) => {
      if (!handler) return;
      this.element!.removeEventListener(eventName, handler);
    });
  }

  private mountChildren(): void {
    const root = this.element;
    if (!root) return;

    Object.entries(this.children).forEach(([key, child]) => {
      const slot = root.querySelector<HTMLElement>(`[data-slot="${key}"]`);
      if (!slot) return;

      slot.innerHTML = "";

      if (Array.isArray(child)) child.forEach((c) => slot.append(c.getContent()));
      else slot.append(child.getContent());
    });
  }

  private makePropsProxy(props: P): P {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        target[prop as keyof P] = value as P[keyof P];
        return true;
      },
    });
  }
}
