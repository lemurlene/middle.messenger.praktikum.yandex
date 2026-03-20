import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./login.hbs?raw";
import { Form } from "../../components/form/Form";
import { authController } from "../../controllers";

export class LoginPage extends Block {
  protected init(): void {
    this.children.form = new Form({
      className: "auth-card__form",
      fields: [
        {
          label: "Логин",
          name: "login",
          placeholder: "Введите логин",
          type: "text",
          autocomplete: "username",
        },
        {
          label: "Пароль",
          name: "password",
          placeholder: "Введите пароль",
          type: "password",
          autocomplete: "current-password",
        },
      ],
      submitText: "Войти",
      onSubmit: (values) => {
        void authController.signIn(values);
      },
    });
  }

  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
