import templateFunction from './upload-avatar.hbs';
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

export default class UploadAvatar extends Form {
    constructor(props: FormProps) {
        super(props);
    }

    public init() {
        this._controls = {
            avatar: new Input({
                message: 'Not empty',
                type: 'file',
                label: 'Avatar',
                name: 'avatar',
                pattern: Regex.NOT_EMPTY,
                accept: "image/*"
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
