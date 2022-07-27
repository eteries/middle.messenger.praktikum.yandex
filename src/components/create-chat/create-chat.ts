import templateFunction from './create-chat.hbs';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import ui from '../../data/ui.json';

interface FormProps {
    ui: Indexed,
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class CreateChat extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            title: new Input({
                message: 'Not empty',
                label: ui.chat.title,
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
