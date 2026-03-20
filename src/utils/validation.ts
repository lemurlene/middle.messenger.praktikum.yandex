export type FieldName =
  | "first_name"
  | "second_name"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "message"
  | "display_name"
  | "old_password"
  | "new_password";

export type ValidationResult = { ok: true } | { ok: false; error: string };

const nameRe = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/u;
const loginRe = /^(?=.{3,20}$)(?!\d+$)[a-zA-Z0-9_-]+$/;
const emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
const passwordRe = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
const phoneRe = /^\+?\d{10,15}$/;

export function validateField(name: FieldName, value: string): ValidationResult {
  const v = value.trim();

  switch (name) {
    case "first_name":
    case "second_name":
      return nameRe.test(v)
        ? { ok: true }
        : { ok: false, error: "Только буквы, первая заглавная, допустим дефис" };

    case "login":
      return loginRe.test(v)
        ? { ok: true }
        : { ok: false, error: "Логин: 3–20, латиница, не только цифры, без пробелов" };

    case "email":
      return emailRe.test(v)
        ? { ok: true }
        : { ok: false, error: "Email должен содержать @ и точку, домен — буквами" };

    case "password":
    case "old_password":
    case "new_password":
      return passwordRe.test(v)
        ? { ok: true }
        : { ok: false, error: "Пароль: 8–40, минимум 1 заглавная и 1 цифра" };

    case "phone":
      return phoneRe.test(v)
        ? { ok: true }
        : { ok: false, error: "Телефон: 10–15 цифр, можно с +" };

    case "message":
      return v.length > 0 ? { ok: true } : { ok: false, error: "Сообщение не должно быть пустым" };

    case "display_name":
      return v.length > 0 ? { ok: true } : { ok: false, error: "Поле не должно быть пустым" };

    default:
      return { ok: true };
  }
}
