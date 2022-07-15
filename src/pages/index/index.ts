import Block from '../../utils/block';
import templateFunction from './index.hbs';
import AuthorizationService from '../../services/authorization-service';
import Router from '../../utils/router';
import { hasError } from '../../utils/network';

export default class Index extends Block {
    _auth: AuthorizationService;
    _router: Router;

    constructor() {
        super();

        this._auth = new AuthorizationService();
        this._router = new Router("#app");

        this._auth.getCurrentUser()
            .then(
                (response) => {
                    if (hasError(response)) {
                        this._router.navigate('/signup.html');
                    } else {
                        this._router.navigate('/chat.html');
                    }
                }
            )
            .catch(
                () => {
                    this._router.navigate('/signup.html');
                }
            )
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
