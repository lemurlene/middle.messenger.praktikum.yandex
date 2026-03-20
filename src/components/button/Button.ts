import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./button.hbs?raw";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export class Button extends Block<ButtonProps> {
  render(): DocumentFragment {
    return compile(tpl, {
      text: this.props.text,
      type: this.props.type ?? "button",
      className: this.props.className ?? "",
    });
  }
}
