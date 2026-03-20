import { AuthService, ChatsService, UserService } from "../services";
import { AuthController } from "./AuthController";
import { ChatsController } from "./ChatsController";
import { UserController } from "./UserController";

const authService = new AuthService();
const userService = new UserService();
const chatsService = new ChatsService();

export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const chatsController = new ChatsController(chatsService);

export { AuthController, UserController, ChatsController };
