import AuthApiService from './auth-api-service';
import { AccountValue, UserValueDTO } from '../types/user';
import store from '../store/store';
import { hasError } from '../utils/network';

export enum AuthStatus {
    'UNKNOWN' = 'unknown',
    'NO_AUTH' = 'no_auth',
    'AUTH' = 'auth'
}

export default class AuthService {
    private readonly _authorizationApiService: AuthApiService;
    public authStatus: AuthStatus;

    constructor() {
        this._authorizationApiService = new AuthApiService();

        this.authStatus = AuthStatus.UNKNOWN;
    }

    public createUser(user: UserValueDTO) {
        return this._authorizationApiService.createUser(user);
    }

    public login(account: AccountValue) {
        return this._authorizationApiService.login(account);
    }

    public logout() {
        store.set('user', null);
        return this._authorizationApiService.logout();
    }

    public async getCurrentUser() {
        const response = await this._authorizationApiService.getCurrentUser();

        if (hasError(response)) {
            new Notification(response.reason);
            this.authStatus = AuthStatus.NO_AUTH;
            store.set('user', null);
        } else {
            this.authStatus = AuthStatus.AUTH;
            store.set('user', response);
        }
    }
}
