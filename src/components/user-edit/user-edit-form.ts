import templateFunction from './user-edit-form.hbs';
import ui from '../../data/ui.json';
import Input from '../input/input';
import { Regex } from '../../constants';
import { PropsObject } from '../../types/common';
import Form from '../../utils/form';

interface FormProps {
    ui: any;
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: PropsObject;
}

export default class UserEditForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            email: new Input({
                message: 'A valid, not empty email',
                label: ui.user.emailLabel,
                type: 'email',
                pattern: Regex.EMAIL
            }),
            login: new Input({
                message: '3-20 letters (or letters + digits)',
                label: ui.user.loginLabel,
                type: 'text',
                pattern: Regex.LOGIN
            }),
            first_name: new Input({
                message: 'Letters, hyphens are allowed (the 1st letter is capitalized)',
                label: ui.user.firstNameLabel,
                type: 'text',
                pattern: Regex.NAME
            }),
            last_name: new Input({
                message: 'Letters, hyphens are allowed (the 1st letter is capitalized)',
                label: ui.user.lastNameLabel,
                type: 'text',
                pattern: Regex.NAME
            }),
            phone: new Input({
                message: '10-15 length, may start with a plus',
                label: ui.user.phoneLabel,
                type: 'password',
                pattern: Regex.PHONE
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
