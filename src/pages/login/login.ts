import Block from '../../utils/block';
import templateFunction from './login.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import LoginForm from '../../components/login-form/login-form';

export default class LoginPage extends Block {
    constructor() {
        super();

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

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }
}
