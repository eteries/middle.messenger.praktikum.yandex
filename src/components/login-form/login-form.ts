import templateFunction from './login-form.hbs';
import ui from '../../data/ui.json';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';

interface FormProps {
    ui: any;
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class LoginForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            login: new Input({
                message: '3-20 letters (or letters + digits)',
                label: ui.user.loginLabel,
                type: 'text',
                pattern: Regex.LOGIN
            }),
            password: new Input({
                message: '3-20 length, at least one digit and one capital letter',
                label: ui.user.passwordLabel,
                type: 'password',
                pattern: Regex.PASSWORD
            })
        };
        this.setProps({
            children: {
                ...this._controls
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
