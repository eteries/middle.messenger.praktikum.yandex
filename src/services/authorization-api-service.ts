import HTTPTransport from '../utils/http';
import { Account, AccountValue, UserDTO, UserValueDTO } from '../types/user';
import { APIError } from '../types/error';

export default class AuthorizationApiService {
    private _http: HTTPTransport = new HTTPTransport();
    private _url: string = 'https://ya-praktikum.tech/api/v2';

    public createUser(user: UserValueDTO) {
        return this._http.post<Account>(`${this._url}/auth/signup`, {
            headers: {
                'content-type': 'application/json'
            },
            data: user,
            'credentials': 'include',
            'mode': 'cors'
        });
    }

    public login(account: AccountValue) {
        return this._http.post<undefined>(`${this._url}/auth/signin`, {
            headers: {
                'content-type': 'application/json'
            },
            data: account,
            'credentials': 'include',
            'mode': 'cors'
        });
    }

    public logout() {
        return this._http.post<undefined>(`${this._url}/auth/logout`);
    }

    public getCurrentUser() {
        return this._http.get<UserDTO | APIError>(`${this._url}/auth/user`, {
            'credentials': 'include',
            'mode': 'cors',
        });
    }
}
