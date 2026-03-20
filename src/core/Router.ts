import { Block } from "./Block";
import { renderDom } from "./renderDom";

type BlockCtor = new () => Block;

type Route = {
  path: string;
  ctor: BlockCtor;
};

export class Router {
  private readonly rootQuery: string;
  private routes: Route[] = [];

  constructor(rootQuery: string) {
    this.rootQuery = rootQuery;
  }

  public use(path: string, ctor: BlockCtor): this {
    this.routes.push({ path, ctor });
    return this;
  }

  public start(): void {
    window.addEventListener("popstate", () => this.onRoute(location.pathname));
    document.addEventListener("click", this.onLinkClick);

    this.onRoute(location.pathname);
  }

  public go(path: string): void {
    if (path === location.pathname) return;
    history.pushState({}, "", path);
    this.onRoute(path);
  }

  public back(): void {
    history.back();
  }

  public forward(): void {
    history.forward();
  }

  private onRoute(pathname: string): void {
    const match =
      this.routes.find((r) => r.path === pathname) ??
      this.routes.find((r) => r.path === "*") ??
      this.routes.find((r) => r.path === "/404");

    if (!match) return;

    const page = new match.ctor();

    renderDom(this.rootQuery, page);
  }

  private onLinkClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest("a[data-link]") as HTMLAnchorElement | null;
    if (!link) return;

    const url = new URL(link.href);
    if (url.origin !== location.origin) return;

    e.preventDefault();
    this.go(url.pathname);
  };
}
