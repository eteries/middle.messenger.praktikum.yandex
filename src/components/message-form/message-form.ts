import templateFunction from './message-form.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import arrow from '../../partials/inline-svg/arrow-right.hbs';
import styles from './message-form.css';

interface FormProps {
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class MessageForm extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            message: new Input({
                message: 'Message can\'t be empty',
                label: '',
                type: 'textarea',
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
        return this.compile(templateFunction, {...this.props, arrow, styles});
    }
}
