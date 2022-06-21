import Block from '../../utils/block';
import templateFunction from './signup.hbs';
import ui from '../../data/ui.json';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';
import SignupForm from '../../components/signup-form/signup-form';

export default class SignupPage extends Block {
    constructor(props: any) {
        super(props);
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
        console.log(evt);
        evt.preventDefault();
        const form = this.props.children.form;
        console.log('form value', form.value);
        console.log('form isValid', form.isValid);
    }
}
