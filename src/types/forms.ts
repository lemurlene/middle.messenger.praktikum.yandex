export type FormValue = string | File | null;
export type FormValues = Record<string, FormValue>;

export type SignInData = {
  login: string;
  password: string;
};

export type SignUpData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

export type ProfileEditData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar?: File | null;
};

export type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

export type SendMessageData = {
  message: string;
};
