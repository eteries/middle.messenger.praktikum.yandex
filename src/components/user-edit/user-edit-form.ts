import templateFunction from './user-edit-form.hbs';
import ui from '../../data/ui.json';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Indexed } from '../../types/common';
import Form from '../../utils/form';
import store, { StoreEvent } from '../../store/store';
import { BlockEvent } from '../../utils/events.enum';
import Modal from '../modal/modal';
import UploadAvatar from '../upload-avatar/upload-avatar';
import UserService from '../../services/user-service';

interface FormProps {
    ui: any;
    events: {
        submit: (evt: SubmitEvent) => void,
        click?: (evt: PointerEvent) => void
    };
    children?: Indexed;
}

export default class UserEditForm extends Form {
    private readonly _userService: UserService;

    constructor(props: FormProps) {
        super(props);

        this._userService = new UserService();

        store.on(StoreEvent.Updated, () => {
            this.init();

            this._eventBus().emit(BlockEvent.FLOW_CDU);
        });

        this._onAvatarSubmit = this._onAvatarSubmit.bind(this);
        this._onAvatarClick = this._onAvatarClick.bind(this);
    }

    public init() {
        this.setProps({
            user: store.getState().user,
        })
        this._controls = {
            email: new Input({
                message: 'A valid, not empty email',
                label: ui.user.emailLabel,
                type: 'email',
                pattern: Regex.EMAIL,
                value: this.props.user?.email
            }),
            login: new Input({
                message: '3-20 letters (or letters + digits)',
                label: ui.user.loginLabel,
                type: 'text',
                pattern: Regex.LOGIN,
                value: this.props.user?.login
            }),
            first_name: new Input({
                message: 'Letters, hyphens are allowed (the 1st letter is capitalized)',
                label: ui.user.firstNameLabel,
                type: 'text',
                pattern: Regex.NAME,
                value: this.props.user?.first_name
            }),
            second_name: new Input({
                message: 'Letters, hyphens are allowed (the 1st letter is capitalized)',
                label: ui.user.lastNameLabel,
                type: 'text',
                pattern: Regex.NAME,
                value: this.props.user?.second_name
            }),
            display_name: new Input({
                message: 'Not empty',
                label: ui.user.displayNameLabel,
                type: 'text',
                pattern: Regex.NOT_EMPTY,
                value: `${this.props.user?.first_name} ${this.props.user?.second_name}`
            }),
            phone: new Input({
                message: '10-15 length, may start with a plus',
                label: ui.user.phoneLabel,
                pattern: Regex.PHONE,
                value: this.props.user?.phone
            })
        };
        this.setProps({
            events: {
                ...this.props.events,
                click: (evt: PointerEvent) => this._onAvatarClick(evt)
            },
            children: {
                ...this._controls,
                avatar: new Modal({
                    ui,
                    title: 'Upload an avatar',
                    children: {
                        content: new UploadAvatar({
                            ui,
                            events: {
                                submit: (evt: SubmitEvent) => this._onAvatarSubmit(evt)
                            }
                        })
                    }
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }

    private _onAvatarSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.avatar.props.children.content;
        const formData = new FormData(form.element);

        if (form.isValid) {
            this._userService.uploadAvatar(formData);
            this.props.children.avatar.hide();
        }
    }

    private _onAvatarClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.js-avatar') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.props.children.avatar.show();
        }
    }
}
