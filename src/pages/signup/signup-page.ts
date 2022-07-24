import Block from '../../utils/block';
import templateFunction from './signup.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import SignupForm from '../../components/signup-form/signup-form';
import AuthService from '../../services/auth-service';
import { hasError } from '../../utils/network';
import Router from '../../utils/router';

export default class SignupPage extends Block {
    private readonly _authService: AuthService;
    private readonly _router: Router;

    constructor() {
        super();
        this._authService = new AuthService();
        this._router = new Router();
        this._onSubmit = this._onSubmit.bind(this);
    }

    init() {
        this.setProps({
            ui,
            styles,
            logo,
            children: {
                form: new SignupForm({
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
            const result = await this._authService.createUser(form.value);
            if (!hasError(result)) {
                this._router.navigate('/chat.html')
            }
        }
    }
}
