import Handlebars from "handlebars";
import "./styles/main.scss";
import { render } from "./utils/render";

import inputTpl from "./components/input/input.hbs?raw";
import buttonTpl from "./components/button/button.hbs?raw";
import chatItemTpl from "./components/chat-item/chat-item.hbs?raw";

import allTpl from "./pages/all/all.hbs?raw";

import loginTpl from "./pages/login/login.hbs?raw";
import registerTpl from "./pages/register/register.hbs?raw";
import chatsTpl from "./pages/chats/chats.hbs?raw";
import profileTpl from "./pages/profile/profile.hbs?raw";
import settingsEditTpl from "./pages/settings-edit/settings-edit.hbs?raw";
import settingsPasswordTpl from "./pages/settings-password/settings-password.hbs?raw";
import notFoundTpl from "./pages/error-404/error-404.hbs?raw";
import serverErrorTpl from "./pages/error-5xx/error-5xx.hbs?raw";

import { chats } from "./mocks/chats";
import { profile } from "./mocks/profile";

Handlebars.registerPartial("input", inputTpl);
Handlebars.registerPartial("button", buttonTpl);
Handlebars.registerPartial("chat-item", chatItemTpl);

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error('Root "#app" not found');

// Компилируем каждый экран в HTML-строку
const pages = {
  login: Handlebars.compile(loginTpl)({}),
  signUp: Handlebars.compile(registerTpl)({}), // ключ signUp оставляем, чтобы all.hbs не менять
  messenger: Handlebars.compile(chatsTpl)({
    chats,
    activeChatTitle: "Вадим",
  }),
  settings: Handlebars.compile(profileTpl)(profile),
  settingsEdit: Handlebars.compile(settingsEditTpl)({}),
  settingsPassword: Handlebars.compile(settingsPasswordTpl)({}),
  notFound: Handlebars.compile(notFoundTpl)({}),
  serverError: Handlebars.compile(serverErrorTpl)({}),
};

// Вставляем всё на одну страницу
const html = Handlebars.compile(allTpl)(pages);
render(root, html);
