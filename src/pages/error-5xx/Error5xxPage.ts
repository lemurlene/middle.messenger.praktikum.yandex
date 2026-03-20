import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./error-5xx.hbs?raw";

export class Error5xxPage extends Block {
  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
