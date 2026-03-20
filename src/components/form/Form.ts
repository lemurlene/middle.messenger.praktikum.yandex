import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./form.hbs?raw";
import { getFormValues } from "../../utils/getFormValues";
import { validateField, type FieldName } from "../../utils/validation";
import type { FormValues } from "../../types";

type Field = {
  name: string;
  placeholder?: string;
  type?: string;
  autocomplete?: string;
  isTextarea?: boolean;
  rows?: number;
  value?: string;
  label?: string;
};

export type FormProps = {
  className?: string;
  fields: Field[];
  submitText: string;
  onSubmit?: (values: FormValues) => void;
};

export class Form extends Block<FormProps> {
  protected addEvents(): void {
    const root = this.getContent();
    const form = root.querySelector("form") as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener("focusout", (e) => {
      const el = e.target as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) return;

      const name = el.name as FieldName;
      if (!name) return;

      this.applyFieldValidation(el, name);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const values = getFormValues(form);

      const inputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[name], textarea[name]"));
      const allOk = inputs.every((el) => {
        const name = el.name as FieldName;
        return this.applyFieldValidation(el, name);
      });

      if (!allOk) return;

      console.log(values);
      this.props.onSubmit?.(values);
    });
  }

  private applyFieldValidation(
    el: HTMLInputElement | HTMLTextAreaElement,
    name: FieldName
  ): boolean {
    const res = validateField(name, el.value);

    const wrapper = el.closest(".input");
    const errorNode = wrapper?.querySelector<HTMLElement>(".input__error") ?? null;

    if (res.ok) {
      wrapper?.classList.remove("input--error");
      if (errorNode) errorNode.textContent = "";
      return true;
    }

    wrapper?.classList.add("input--error");
    if (errorNode) errorNode.textContent = res.error;
    return false;
  }

  render(): DocumentFragment {
    return compile(tpl, {
      className: this.props.className ?? "",
      fields: this.props.fields,
      button: {
        text: this.props.submitText,
        type: "submit",
        className: "button button--primary",
      },
    });
  }
}
