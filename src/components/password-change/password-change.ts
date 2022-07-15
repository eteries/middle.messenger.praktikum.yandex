import templateFunction from './password-change.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import arrow from '../../partials/inline-svg/arrow-right.hbs';
import ui from '../../data/ui.json';

interface FormProps {
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class PasswordChange extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            password: new Input({
                message: '8-40 length, at least one digit and one capital letter',
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
        return this.compile(templateFunction, {...this.props, arrow});
    }
}
