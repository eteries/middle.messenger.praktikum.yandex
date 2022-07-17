import templateFunction from './create-chat.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import arrow from '../../partials/inline-svg/arrow-right.hbs';

interface FormProps {
    ui: Indexed,
    onClose: () => void,
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class CreateChat extends Form {
    constructor(props: FormProps) {
        super(props);

        (this.element?.querySelector('button') as HTMLButtonElement)
            .addEventListener('click', () => this._close())
    }

    public init() {
        this._controls = {
            title: new Input({
                message: 'Not empty',
                label: 'Название',
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

    private _close() {
        this.props.onClose();
    }
}
