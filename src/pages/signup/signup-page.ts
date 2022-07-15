import Block from '../../utils/block';
import templateFunction from './signup.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import SignupForm from '../../components/signup-form/signup-form';
import AuthorizationService from '../../services/authorization-service';
import { hasError } from '../../utils/network';
import Router from '../../utils/router';

export default class SignupPage extends Block {
    private readonly _authorizationService: AuthorizationService;
    private readonly _router: Router;

    constructor() {
        super();
        this._authorizationService = new AuthorizationService();
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
            const result = await this._authorizationService.createUser(form.value);
            console.log(result);
            if (!hasError(result)) {
                this._router.navigate('/login.html')
            }
        }
    }
}
