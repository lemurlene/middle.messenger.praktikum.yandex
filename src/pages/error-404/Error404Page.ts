import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./error-404.hbs?raw";

export class Error404Page extends Block {
  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
