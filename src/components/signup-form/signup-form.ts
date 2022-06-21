import templateFunction from './signup-form.hbs';
import ui from '../../data/ui.json';
import Input from '../input/input';
import { Regex } from '../../constants';
import { PropsObject } from '../../utils/types';
import Form from '../../utils/form';

interface FormProps {
    ui: any;
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children: PropsObject;
}

export default class SignupForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            email: new Input({
                message: 'Неверный формат email',
                label: ui.user.emailLabel,
                name: 'email',
                type: 'email',
                pattern: Regex.EMAIL
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
