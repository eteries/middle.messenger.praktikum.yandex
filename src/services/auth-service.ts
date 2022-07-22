import AuthApiService from './auth-api-service';
import { AccountValue, UserValueDTO } from '../types/user';
import store from '../store/store';
import { hasError } from '../utils/network';

export enum AuthStatus {
    'UNKNOWN',
    'NO_AUTH',
    'AUTH'
}

export default class AuthService {
    private readonly _authorizationApiService = new AuthApiService();
    public hasAuth: AuthStatus;

    constructor() {
        this.hasAuth = AuthStatus.UNKNOWN;
    }

    public createUser(user: UserValueDTO) {
        return this._authorizationApiService.createUser(user);
    }

    public login(account: AccountValue) {
        return this._authorizationApiService.login(account);
    }

    public logout() {
        store.set('user', null)
        return this._authorizationApiService.logout();
    }

    public async getCurrentUser() {
        const response = await this._authorizationApiService.getCurrentUser();

        if (hasError(response)) {
            new Notification(response.reason);
            store.set('user', null);
            this.hasAuth = AuthStatus.NO_AUTH;
        } else {
            store.set('user', response);
            this.hasAuth = AuthStatus.AUTH;
        }
    }
}
