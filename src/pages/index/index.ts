import Block from '../../utils/block';
import templateFunction from './index.hbs';
import AuthService, { AuthStatus } from '../../services/auth-service';
import Router from '../../utils/router';
import store, { StoreEvent } from '../../store/store';

export default class Index extends Block {
    _authService: AuthService;
    _router: Router;

    constructor() {
        super();

        this._authService = new AuthService();
        this._router = new Router("#app");

        this._authService.getCurrentUser();

        store.on(StoreEvent.Updated, () => {
            if (this._authService.authStatus === AuthStatus.UNKNOWN) {
                return;
            }

            const {user} = store.getState();
            this.setProps({user});
            if (!user) {
                this._router.navigate('/signup.html');
            } else {
                this._router.navigate('/chat.html');
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
