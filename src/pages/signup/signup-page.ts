import Block from '../../utils/block';
import templateFunction from './signup.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import SignupForm from '../../components/signup-form/signup-form';

export default class SignupPage extends Block {
    constructor() {
        super();

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

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }
}
