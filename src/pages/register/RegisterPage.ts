import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./register.hbs?raw";
import { Form } from "../../components/form/Form";
import { authController } from "../../controllers";

export class RegisterPage extends Block {
  protected init(): void {
    this.children.form = new Form({
      className: "auth-card__form",
      fields: [
        { label: "Почта", name: "email", placeholder: "Введите почту", type: "email", autocomplete: "email" },
        { label: "Логин", name: "login", placeholder: "Введите логин", type: "text", autocomplete: "username" },
        { label: "Имя", name: "first_name", placeholder: "Введите имя", type: "text", autocomplete: "given-name" },
        { label: "Фамилия", name: "second_name", placeholder: "Введите фамилию", type: "text", autocomplete: "family-name" },
        { label: "Телефон", name: "phone", placeholder: "Введите телефон", type: "tel", autocomplete: "tel" },
        { label: "Пароль", name: "password", placeholder: "Введите пароль", type: "password", autocomplete: "new-password" },
      ],
      submitText: "Зарегистрироваться",
      onSubmit: (values) => {
        void authController.signUp(values);
      },
    });
  }

  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
