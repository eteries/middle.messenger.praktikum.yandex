import Block from '../../utils/block';
import templateFunction from './login.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import LoginForm from '../../components/login-form/login-form';
import AuthorizationService from '../../services/authorization-service';
import Router from '../../utils/router';
import { hasError } from '../../utils/network';

export default class LoginPage extends Block {
    private readonly _authorizationService: AuthorizationService;
    private readonly _router: Router;

    constructor() {
        super();
        this._authorizationService = new AuthorizationService();
        this._router = new Router();

        this._onSubmit = this._onSubmit.bind(this);
    }

    public init() {
        this.setProps({
            ui,
            styles,
            logo,
            children: {
                form: new LoginForm({
                    ui,
                    events: {
                        submit: (evt) => this._onSubmit(evt)
                    }
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }

    private async _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            const result = await this._authorizationService.login(form.value);
            console.log(form.value);
            if (!hasError(result)) {
                this._router.navigate('/chat.html')
            }
        }
    }
}
