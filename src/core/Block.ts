import { EventBus } from "./EventBus";

export type Props = Record<string, unknown>;
export type Children = Record<string, Block | Block[]>;

type Meta = { tagName: string };
type Listener = (...args: unknown[]) => void;

export abstract class Block<P extends Props = Props> {
  private static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public readonly id: string;

  protected props: P;
  protected children: Children;

  private readonly eventBus: EventBus;
  private readonly meta: Meta;
  private element: HTMLElement | null = null;

  constructor(
    propsAndChildren: (P & Record<string, unknown>) = {} as P & Record<string, unknown>,
    tagName = "div"
  ) {
    this.id = Block.makeId();
    this.meta = { tagName };
    this.eventBus = new EventBus();

    const { props, children } = this.separateChildren(propsAndChildren);
    this.children = children;
    this.props = this.makePropsProxy(props);

    this.registerLifecycleEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  public getContent(): HTMLElement {
    if (!this.element) throw new Error("Block: element is not created yet");
    return this.element;
  }

  public setProps(nextProps: Partial<P>): void {
    if (!nextProps) return;

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected init(): void {}
  protected componentDidMount(): void {}

  protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }

  protected abstract render(): DocumentFragment;

  protected addEvents(): void {}
  protected removeEvents(): void {}

  private registerLifecycleEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.onInit.bind(this) as Listener);
    eventBus.on(Block.EVENTS.FLOW_CDM, this.onComponentDidMount.bind(this) as Listener);
    eventBus.on(Block.EVENTS.FLOW_CDU, this.onComponentDidUpdate.bind(this) as Listener);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.onRender.bind(this) as Listener);
  }

  private onInit(): void {
    this.element = document.createElement(this.meta.tagName);
    this.element.setAttribute("data-id", this.id);
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private onComponentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) child.forEach((c) => c.dispatchComponentDidMount());
      else child.dispatchComponentDidMount();
    });
  }

  private onComponentDidUpdate(oldProps: P, newProps: P): void {
    const shouldRender = this.componentDidUpdate(oldProps, newProps);
    if (shouldRender) this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private onRender(): void {
    if (!this.element) throw new Error("Block: element is not created");

    this.removeEvents();

    const fragment = this.render();

    this.element.innerHTML = "";
    this.element.append(fragment);

    this.mountChildren();

    this.addEvents();
  }

  private mountChildren(): void {
    const root = this.getContent();

    Object.entries(this.children).forEach(([key, child]) => {
      const slot = root.querySelector<HTMLElement>(`[data-slot="${key}"]`);
      if (!slot) return;

      slot.replaceChildren();

      if (Array.isArray(child)) {
        child.forEach((c) => slot.append(c.getContent()));
      } else {
        slot.append(child.getContent());
      }
    });
  }

  private separateChildren(
    propsAndChildren: P & Record<string, unknown>
  ): { props: P; children: Children } {
    const props: Record<string, unknown> = {};
    const children: Children = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
        return;
      }

      if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value as Block[];
        return;
      }

      props[key] = value;
    });

    return { props: props as P, children };
  }

  private makePropsProxy(initialProps: P): P {
    return new Proxy(initialProps, {
      get(target, prop: string) {
        return target[prop as keyof P];
      },
      set(target, prop: string, value: unknown) {
        target[prop as keyof P] = value as P[keyof P];
        return true;
      },
      deleteProperty() {
        throw new Error("Block: no access");
      },
    });
  }

  private static makeId(): string {
    return `b_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}
