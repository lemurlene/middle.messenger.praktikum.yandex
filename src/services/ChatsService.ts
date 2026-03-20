export type Chat = {
  id: number;
  title: string;
  avatarUrl?: string;
  unreadCount?: number;
  lastMessage?: { text: string; time: string; timeIso: string };
};

export type Message = {
  text: string;
  time: string;
  timeIso: string;
  isMine?: boolean;
};

export class ChatsService {
  private selectedChatId = 1;

  private chats: Chat[] = [
    {
      id: 1,
      title: "Приветственный чат",
      unreadCount: 2,
      lastMessage: { text: "Добро пожаловать 🙂", time: "09:20", timeIso: "2026-03-08T09:20:00.000Z" },
    },
    {
      id: 2,
      title: "Frontend Crew",
      unreadCount: 0,
      lastMessage: { text: "Код-ревью в четверг?", time: "18:05", timeIso: "2026-03-08T18:05:00.000Z" },
    },
  ];

  private messagesByChat: Record<number, Message[]> = {
    1: [
      { text: "Привет! Добро пожаловать 🙂", time: "09:20", timeIso: "2026-03-08T09:20:00.000Z" },
      { text: "Спасибо!", time: "09:21", timeIso: "2026-03-08T09:21:00.000Z", isMine: true },
    ],
    2: [
      { text: "Код-ревью в четверг?", time: "18:05", timeIso: "2026-03-08T18:05:00.000Z" },
      { text: "Да, ок.", time: "18:06", timeIso: "2026-03-08T18:06:00.000Z", isMine: true },
    ],
  };

  getChats(): Chat[] {
    return this.chats;
  }

  getSelectedChatId(): number {
    return this.selectedChatId;
  }

  selectChat(id: number): void {
    this.selectedChatId = id;
  }

  getMessages(chatId = this.selectedChatId): Message[] {
    return this.messagesByChat[chatId] ?? [];
  }

  sendMessage(text: string, chatId = this.selectedChatId): Message {
    const now = new Date();
    const msg: Message = {
      text,
      time: now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      timeIso: now.toISOString(),
      isMine: true,
    };

    const list = this.messagesByChat[chatId] ?? [];
    this.messagesByChat[chatId] = [...list, msg];

    return msg;
  }
}
