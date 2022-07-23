import HTTPTransport from '../utils/http';
import { APIError } from '../types/error';
import { UserDTO } from '../types/user';

export default class UserApiService {
    private _http: HTTPTransport = new HTTPTransport();
    private _url: string = 'https://ya-praktikum.tech/api/v2';

    public searchUser(login: string) {
        return this._http.post<UserDTO[] | APIError>(`${this._url}/user/search`, {
            headers: {
                'content-type': 'application/json'
            },
            data: login
        });
    }

    public uploadAvatar(avatar: FormData) {
        return this._http.put<UserDTO | APIError>(`${this._url}/user/profile/avatar`, {
            data: avatar
        });
    }

    public updatePassword(oldPassword: string, newPassword: string) {
        return this._http.put<undefined | APIError>(`${this._url}/user/password`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                oldPassword,
                newPassword
            }
        });
    }
}
