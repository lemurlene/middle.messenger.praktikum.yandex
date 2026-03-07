export type Chat = {
  id: number;
  title: string;
  avatarUrl: string;
  unreadCount: number;
  lastMessage: {
    author: string;
    text: string;
    time: string;
  };
};

export const chats: Chat[] = [
  {
    id: 1,
    title: "Приветственный чат",
    avatarUrl: "welcome.jpg",
    unreadCount: 2,
    lastMessage: {
      author: "Бот",
      text: "<b>Добро пожаловать!</b>",
      time: "09:20",
    },
  },
  {
    id: 2,
    title: "Frontend Crew",
    avatarUrl: "frontend.jpg",
    unreadCount: 0,
    lastMessage: {
      author: "Витя",
      text: "Код ревью в четверг?",
      time: "18:05",
    },
  },
];