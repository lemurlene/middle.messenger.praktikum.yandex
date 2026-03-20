import type { ChangePasswordData, ProfileEditData } from "../types";

export class UserService {
  async updateProfile(data: ProfileEditData): Promise<void> {
    console.log("[UserService] updateProfile:", {
      ...data,
      avatar: data.avatar ? `[File: ${data.avatar.name}]` : null,
    });
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    console.log("[UserService] changePassword:", data);
  }
}
