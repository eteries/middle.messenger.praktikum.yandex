import ChatApiService from './chat-api-service';
import store from '../store/store';
import { hasError } from '../utils/network';
import { ChatValueDTO } from '../types/chat';
import Notification from '../utils/notification';
import UserService from './user-service';

export default class ChatService {
    private readonly _chatApiService = new ChatApiService();
    private readonly _userService = new UserService();

    public async getChats() {
        const result = await this._chatApiService.getChats();
        store.set('chats', result)
    }

    public async getChat(id: number) {
        const result = await this._chatApiService.getChat(id);
        store.set('chat', result)
    }

    public async createChat(chat: ChatValueDTO) {
        const result = await this._chatApiService.createChat(chat);
        if (!hasError(result)) {
            await this.getChats();
        }
    }

    public async addUser(login: string, chatId: number) {
        const user = await this._userService.searchUser(login);
        if (hasError(user)) {
            new Notification(user.reason);
            return;
        }

        if (user.length === 0) {
            new Notification('User is not found');
            return;
        }

        const result = await this._chatApiService.addUsers([user[0].id], chatId);
        if (!hasError(result)) {
            await this.getChats();
        } else {
            new Notification(result.reason);
        }
    }

    public async createToken(chatId: number) {
        console.log('Запрашиваю токен');
        const response = await this._chatApiService.createToken(chatId);
        if (!hasError(response)) {
            console.log('Сохраняю токен', response.token);
            store.set('token', response.token)
        } else {
            new Notification(response.reason);
        }
    }
}
