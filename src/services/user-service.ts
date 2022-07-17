import UserApiService from './user-api-service';

export default class UserService {
    private readonly _userApiService = new UserApiService();

    public async searchUser(login: string) {
        return await this._userApiService.searchUser(login);
    }
}
