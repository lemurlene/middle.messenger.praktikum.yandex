import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./profile.hbs?raw";
import { profile } from "../../mocks/profile";

export class ProfilePage extends Block {
  render(): DocumentFragment {
    return compile(
      tpl,
      {
        display_name: profile.display_name,
        rows: [
          { key: "Почта", value: profile.email },
          { key: "Логин", value: profile.login },
          { key: "Имя", value: profile.first_name },
          { key: "Фамилия", value: profile.second_name },
          { key: "Телефон", value: profile.phone },
        ],
      },
      { withLayout: true }
    );
  }
}
