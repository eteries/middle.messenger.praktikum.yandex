import templateFunction from './add-user.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import arrow from '../../partials/inline-svg/arrow-right.hbs';

interface FormProps {
    ui: Indexed,
    events: {
        submit: (evt: SubmitEvent) => void,
        click: (evt: PointerEvent) => void,
    };
    children?: Indexed;
}

export default class AddUser extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            login: new Input({
                message: 'Not empty',
                label: 'User\'s login',
                pattern: Regex.MESSAGE
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
