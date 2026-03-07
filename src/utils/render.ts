import Handlebars from "handlebars";
import baseTpl from "../layouts/base.hbs?raw";

export function render(root: HTMLElement, pageHtml: string): void {
  const layout = Handlebars.compile(baseTpl)({ body: pageHtml });

  const tpl = document.createElement("template");
  tpl.innerHTML = layout;

  root.replaceChildren(tpl.content);
}