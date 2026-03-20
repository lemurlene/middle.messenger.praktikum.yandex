import { Block } from "./Block";

export function renderDom(rootQuery: string, page: Block): void {
  const root = document.querySelector(rootQuery);
  if (!root) throw new Error(`Root not found: ${rootQuery}`);

  root.innerHTML = "";
  root.append(page.getContent());

  page.dispatchComponentDidMount?.();
}
