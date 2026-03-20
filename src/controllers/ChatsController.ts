import type { FormValues, SendMessageData } from "../types";
import { ChatsService } from "../services";
import { pick } from "./helpers";

export class ChatsController {
  constructor(private readonly chats: ChatsService) {}

  getChats() {
    return this.chats.getChats();
  }

  getSelectedChatId() {
    return this.chats.getSelectedChatId();
  }

  selectChat(id: number) {
    this.chats.selectChat(id);
  }

  getMessages(chatId?: number) {
    return this.chats.getMessages(chatId);
  }

  sendMessage(values: FormValues): void {
    const data: SendMessageData = { message: pick(values, "message") };
    console.log("[ChatsController] sendMessage values:", data);

    if (!data.message.trim()) return;
    this.chats.sendMessage(data.message);
  }
}
