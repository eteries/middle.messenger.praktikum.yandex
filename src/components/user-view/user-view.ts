import Block from '../../utils/block';
import templateFunction from './user-view.hbs';
import store, { StoreEvent } from '../../store/store';
import { BlockEvent } from '../../utils/events.enum';
import Modal from '../modal/modal';
import ui from '../../data/ui.json';
import PasswordChange from '../password-change/password-change';
import UserService from '../../services/user-service';

interface UserViewProps {
    ui: any;
    events?: {
        click?: (evt: MouseEvent) => void
    }
}

export default class UserView extends Block {
    private readonly _userService: UserService;

    public constructor(props: UserViewProps) {
        super(props);

        this._userService = new UserService();

        this.init();

        store.on(StoreEvent.Updated, () => {
            this.setProps({
                user: store.getState().user
            });
            this._eventBus().emit(BlockEvent.FLOW_CDU);
        });
    }

    public init() {
        this.setProps({
            events: {
                click: (evt: PointerEvent) => this._onPasswordClick(evt)
            },
            children: {
                password: new Modal({
                    ui,
                    events: {
                        click: (evt: PointerEvent) => this._onCloseClick(evt)
                    },
                    children: {
                        content: new PasswordChange({
                            ui,
                            events: {
                                submit: (evt: SubmitEvent) => this._onPasswordSubmit(evt),
                                click: (evt: PointerEvent) => this._onCloseClick(evt)
                            }
                        })
                    }
                })
            }
        });
    }

    private _onPasswordClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.password') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.props.children.password.show();
        }
    }

    private _onCloseClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.close') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.props.children.password.hide();
        }
    }

    private _onPasswordSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const passwordModal = this.props.children.password;
        const form = passwordModal.props.children.content;

        if (form.isValid) {
            console.log(form);
            this._userService.updatePassword(form.value.oldPass, form.value.newPass);
            this.props.children.password.hide();
        }
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
