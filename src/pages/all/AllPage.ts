import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./all.hbs?raw";

export class AllPage extends Block {
  render(): DocumentFragment {
    return compile(tpl, {});
  }
}
