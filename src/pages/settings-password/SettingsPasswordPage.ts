import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./settings-password.hbs?raw";
import { Form } from "../../components/form/Form";
import { userController } from "../../controllers";

export class SettingsPasswordPage extends Block {
  protected init(): void {
    this.children.form = new Form({
      className: "auth-card__form",
      fields: [
        {
          label: "Старый пароль",
          name: "old_password",
          placeholder: "Введите старый пароль",
          type: "password",
          autocomplete: "current-password",
        },
        {
          label: "Новый пароль",
          name: "new_password",
          placeholder: "Введите новый пароль",
          type: "password",
          autocomplete: "new-password",
        },
      ],
      submitText: "Сохранить",
      onSubmit: (values) => {
        void userController.changePassword(values);
      },
    });
  }

  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
