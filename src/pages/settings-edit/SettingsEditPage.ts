import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./settings-edit.hbs?raw";
import { Form } from "../../components/form/Form";
import { userController } from "../../controllers";

export class SettingsEditPage extends Block {
  protected init(): void {
    this.children.form = new Form({
      className: "auth-card__form",
      fields: [
        { label: "Имя", name: "first_name", placeholder: "Имя", type: "text", autocomplete: "given-name" },
        { label: "Фамилия", name: "second_name", placeholder: "Фамилия", type: "text", autocomplete: "family-name" },
        { label: "Имя в чате", name: "display_name", placeholder: "Имя в чате", type: "text", autocomplete: "nickname" },
        { label: "Логин", name: "login", placeholder: "Логин", type: "text", autocomplete: "username" },
        { label: "Почта", name: "email", placeholder: "Почта", type: "email", autocomplete: "email" },
        { label: "Телефон", name: "phone", placeholder: "Телефон", type: "tel", autocomplete: "tel" },
        { label: "Аватар", name: "avatar", type: "file" },
      ],
      submitText: "Сохранить",
      onSubmit: (values) => {
        void userController.updateProfile(values);
      },
    });
  }

  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
