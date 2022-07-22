import Block from '../../utils/block';
import templateFunction from './index.hbs';
import AuthService from '../../services/auth-service';
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
            const {user} = store.getState();
            this.setProps({user});
            if (user === null) {
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
