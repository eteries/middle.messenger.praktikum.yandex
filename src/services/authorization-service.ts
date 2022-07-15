import AuthorizationApiService from './authorization-api-service';
import { AccountValue, UserValueDTO } from '../types/user';
import store from '../store/store';

export default class AuthorizationService {
    private readonly _authorizationApiService = new AuthorizationApiService();

    public createUser(user: UserValueDTO) {
        return this._authorizationApiService.createUser(user);
    }

    public login(account: AccountValue) {
        return this._authorizationApiService.login(account);
    }

    public logout() {
        return this._authorizationApiService.logout();
    }

    public async getCurrentUser() {
        const result = await this._authorizationApiService.getCurrentUser();
        store.set('user', result)
    }
}
