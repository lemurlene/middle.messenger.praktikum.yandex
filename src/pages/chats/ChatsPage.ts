import Handlebars from "handlebars";
import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./chats.hbs?raw";

import chatItemTpl from "../../components/chat-item/chat-item.hbs?raw";
import { Form } from "../../components/form";
import { ChatMessage } from "../../components/chat-message";
import { chats } from "../../mocks/chats";
import { chatsController } from "../../controllers";

type ChatsPageProps = { selectedChatId: number };
type Message = { text: string; time: string; timeIso: string; isMine?: boolean };

const messagesByChat: Record<number, Message[]> = {
  1: [
    { text: "Привет! Добро пожаловать 🙂", time: "09:20", timeIso: "2026-03-08T09:20:00.000Z" },
    { text: "Спасибо!", time: "09:21", timeIso: "2026-03-08T09:21:00.000Z", isMine: true },
  ],
  2: [
    { text: "Код-ревью в четверг?", time: "18:05", timeIso: "2026-03-08T18:05:00.000Z" },
    { text: "Да, ок.", time: "18:06", timeIso: "2026-03-08T18:06:00.000Z", isMine: true },
  ],
};

class ChatListItem extends Block<{ chat: (typeof chats)[number]; isActive: boolean }> {
  render(): DocumentFragment {
    const html = Handlebars.compile(chatItemTpl)({
      ...this.props.chat,
      isActive: this.props.isActive,
    });

    const t = document.createElement("template");
    t.innerHTML = html.trim();

    const el = t.content.firstElementChild as HTMLElement | null;
    if (el) el.setAttribute("data-chat-id", String(this.props.chat.id));

    return t.content;
  }
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    if (!Handlebars.partials["chat-item"]) {
      Handlebars.registerPartial("chat-item", chatItemTpl);
    }

    let self!: ChatsPage;
    const handleClick = (e: Event) => self.onClick(e);

    super({
      selectedChatId: chats[0]?.id ?? 1,
      events: {
        click: handleClick,
      },
    } as unknown as ChatsPageProps);

    self = this;
  }

  protected init(): void {
    this.children.chatList = this.buildChatList(this.props.selectedChatId);
    this.children.messages = this.buildMessages(this.props.selectedChatId);

    this.children.messageForm = new Form({
      className: "message-form",
      fields: [
        {
          name: "message",
          isTextarea: true,
          rows: 2,
          placeholder: "Сообщение",
          autocomplete: "off",
        },
      ],
      submitText: "Отправить",
      onSubmit: (values) => {
        chatsController.sendMessage(values);

        this.children.messages = this.buildMessages(this.props.selectedChatId);
        this.setProps({ selectedChatId: this.props.selectedChatId });
      },
    });
  }

  private onClick(e: Event): void {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const item = target.closest("[data-chat-id]");
    if (!item) return;

    const id = Number(item.getAttribute("data-chat-id"));
    if (!id || id === this.props.selectedChatId) return;

    this.children.chatList = this.buildChatList(id);
    this.children.messages = this.buildMessages(id);
    this.setProps({ selectedChatId: id });
  }

  private buildChatList(selectedId: number): Block[] {
    return chats.map((c) => new ChatListItem({ chat: c, isActive: c.id === selectedId }));
  }

  private buildMessages(chatId: number): Block[] {
    const list = messagesByChat[chatId] ?? [];
    return list.map((m) => new ChatMessage(m));
  }

  render(): DocumentFragment {
    return compile(tpl, {}, { withLayout: true });
  }
}
