export type UserProfile = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
};

export const profile: UserProfile = {
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  login: "ivanivanov",
  email: "pochta@yandex.ru",
  phone: "+7 (909) 967 30 30".replace(/\s/g, ""),
  avatar: "img/user.png",
};

export const profileView = {
  display_name: profile.display_name,
  rows: [
    { key: "Почта", value: profile.email },
    { key: "Логин", value: profile.login },
    { key: "Имя", value: profile.first_name },
    { key: "Фамилия", value: profile.second_name },
    { key: "Телефон", value: profile.phone },
  ],
};
