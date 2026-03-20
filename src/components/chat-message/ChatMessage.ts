import { Block } from "../../core/Block";
import { compile } from "../../core/compile";
import tpl from "./chat-message.hbs?raw";

type ChatMessageProps = {
  text: string;
  time: string;
  timeIso: string;
  isMine?: boolean;
};

export class ChatMessage extends Block<ChatMessageProps> {
  render(): DocumentFragment {
    return compile(tpl, {
      text: this.props.text,
      time: this.props.time,
      timeIso: this.props.timeIso,
      isMine: Boolean(this.props.isMine),
    });
  }
}
