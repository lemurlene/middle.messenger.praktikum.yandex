import type { ChangePasswordData, FormValues, ProfileEditData } from "../types";
import { UserService } from "../services";
import { pick } from "./helpers";

export class UserController {
  constructor(private readonly user: UserService) {}

  async updateProfile(values: FormValues): Promise<void> {
    const data: ProfileEditData = {
      first_name: pick(values, "first_name"),
      second_name: pick(values, "second_name"),
      display_name: pick(values, "display_name"),
      login: pick(values, "login"),
      email: pick(values, "email"),
      phone: pick(values, "phone"),
      avatar: values["avatar"] instanceof File ? values["avatar"] : null,
    };

    console.log("[UserController] updateProfile values:", data);
    await this.user.updateProfile(data);
  }

  async changePassword(values: FormValues): Promise<void> {
    const data: ChangePasswordData = {
      old_password: pick(values, "old_password"),
      new_password: pick(values, "new_password"),
    };

    console.log("[UserController] changePassword values:", data);
    await this.user.changePassword(data);
  }
}
