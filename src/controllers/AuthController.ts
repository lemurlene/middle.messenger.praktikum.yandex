import type { FormValues, SignInData, SignUpData } from "../types";
import { AuthService } from "../services";
import { pick } from "./helpers";

export class AuthController {
  constructor(private readonly auth: AuthService) {}

  async signIn(values: FormValues): Promise<void> {
    const data: SignInData = {
      login: pick(values, "login"),
      password: pick(values, "password"),
    };

    console.log("[AuthController] signIn values:", data);
    await this.auth.signIn(data);
  }

  async signUp(values: FormValues): Promise<void> {
    const data: SignUpData = {
      email: pick(values, "email"),
      login: pick(values, "login"),
      first_name: pick(values, "first_name"),
      second_name: pick(values, "second_name"),
      phone: pick(values, "phone"),
      password: pick(values, "password"),
    };

    console.log("[AuthController] signUp values:", data);
    await this.auth.signUp(data);
  }
}
