import templateFunction from './remove-user.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';

interface FormProps {
    ui: Indexed,
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class RemoveUser extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            login: new Input({
                message: 'Not empty',
                label: 'User\'s login',
                pattern: Regex.NOT_EMPTY
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
