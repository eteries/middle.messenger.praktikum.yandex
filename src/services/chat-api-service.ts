import HTTPTransport from '../utils/http';
import { APIError } from '../types/error';
import { ChatDTO, ChatValueDTO } from '../types/chat';

export default class ChatApiService {
    private _http: HTTPTransport = new HTTPTransport();
    private _url: string = 'https://ya-praktikum.tech/api/v2';

    public getChats(offset: number = 0, limit: number = 20, title: string = '') {
        return this._http.get<ChatDTO[] | APIError>(`${this._url}/chats`, {
            data: {offset, limit, title}
        });
    }

    public getChat(id: number) {
        return this._http.get<ChatDTO | APIError>(`${this._url}/chats/${id}/common`);
    }

    public createChat(chat: ChatValueDTO) {
        return this._http.post<undefined | APIError>(`${this._url}/chats`, {
            headers: {
                'content-type': 'application/json'
            },
            data: chat
        });
    }

    public addUsers(usersId: number[], chatId: number) {
        return this._http.put<undefined | APIError>(`${this._url}/chats/users`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                users: usersId,
                chatId
            }
        });
    }

    public removeUsers(usersId: number[], chatId: number) {
        return this._http.delete<undefined | APIError>(`${this._url}/chats/users`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                users: usersId,
                chatId
            }
        });
    }
}
