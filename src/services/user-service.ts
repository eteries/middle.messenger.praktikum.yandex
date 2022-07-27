import UserApiService from './user-api-service';
import { hasError } from '../utils/network';
import store from '../store/store';
import AuthService from './auth-service';
import { UserValueDTO } from '../types/user';

export default class UserService {
    private readonly _userApiService = new UserApiService();
    private readonly _authService = new AuthService();

    public async searchUser(login: string) {
        return await this._userApiService.searchUser(login);
    }

    public async uploadAvatar(avatar: FormData) {
        const response =  await this._userApiService.uploadAvatar(avatar);

        if (hasError(response)) {
            new Notification(response.reason);
        } else {
            store.set('user', response);
            new Notification('The user has been updated');
        }
    }

    public async updatePassword(oldPass: string, newPass: string) {
        const response =  await this._userApiService.updatePassword(oldPass, newPass);

        if (hasError(response)) {
            new Notification(response.reason);
        } else {
            new Notification('The password has been updated. Use it to log in');
            store.set('user', null);
            this._authService.logout();
        }
    }

    public async updateUser(user: UserValueDTO) {
        const response =  await this._userApiService.updateUser(user);

        if (hasError(response)) {
            new Notification(response.reason);
        } else {
            new Notification('The user has been updated.');
            store.set('user', response);
        }
    }
}
