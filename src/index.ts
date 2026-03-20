import "./styles/main.scss";
import Handlebars from "handlebars";
import { Router } from "./core/Router";
import baseTpl from "./layouts/base.hbs?raw";
import buttonTpl from "./components/button/button.hbs?raw";
import inputTpl from "./components/input/input.hbs?raw";
import formTpl from "./components/form/form.hbs?raw";

Handlebars.registerPartial("base", baseTpl);
Handlebars.registerPartial("button", buttonTpl);
Handlebars.registerPartial("input", inputTpl);
Handlebars.registerPartial("form", formTpl);

import { AllPage } from "./pages/all/AllPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { ChatsPage } from "./pages/chats/ChatsPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { SettingsEditPage } from "./pages/settings-edit/SettingsEditPage";
import { SettingsPasswordPage } from "./pages/settings-password/SettingsPasswordPage";
import { Error404Page } from "./pages/error-404/Error404Page";
import { Error5xxPage } from "./pages/error-5xx/Error5xxPage";

const router = new Router("#app");

router
  .use("/", AllPage)
  .use("/login", LoginPage)
  .use("/register", RegisterPage)
  .use("/chats", ChatsPage)
  .use("/profile", ProfilePage)
  .use("/settings/edit", SettingsEditPage)
  .use("/settings/password", SettingsPasswordPage)
  .use("/500", Error5xxPage)
  .use("/404", Error404Page)
  .use("*", Error404Page);

router.start();
