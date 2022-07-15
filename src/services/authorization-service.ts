import AuthorizationApiService from './authorization-api-service';
import { AccountValue, UserValueDTO } from '../types/user';

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

    public getCurrentUser() {
        return this._authorizationApiService.getCurrentUser();
    }
}
