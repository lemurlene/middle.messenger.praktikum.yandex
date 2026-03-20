import type { SignInData, SignUpData } from "../types";

export class AuthService {
  async signIn(data: SignInData): Promise<void> {
    console.log("[AuthService] signIn:", data);
  }

  async signUp(data: SignUpData): Promise<void> {
    console.log("[AuthService] signUp:", data);
  }
}
