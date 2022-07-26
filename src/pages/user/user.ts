import Block from '../../utils/block';
import templateFunction from './user.hbs';
import ui from '../../data/ui.json';
import logo from '../../assets/img/logo-taper.svg';
import UserEditForm from '../../components/user-edit/user-edit-form';
import UserView from '../../components/user-view/user-view';
import left from '../../partials/inline-svg/arrow-left.hbs';
import styles from './user.css';
import AuthService from '../../services/auth-service';
import Router from '../../utils/router';
import { hasError } from '../../utils/network';
import store, { StoreEvent } from '../../store/store';
import UserService from '../../services/user-service';

export default class UserPage extends Block {
    private readonly _authService: AuthService;
    private readonly _userService: UserService;
    private readonly _router: Router;

    public constructor() {
        super();

        this._userService = new UserService();
        this._authService = new AuthService();
        this._router = new Router();

        store.on(StoreEvent.Updated, () => {
            this.setProps({user: store.getState().user});
        });
    }

    public init() {
        this.setProps({
            isEdit: false,
            logo,
            left,
            styles,
            events: {
                click: (evt: PointerEvent) => {
                    this._onEditClick(evt);
                    this._onLogoutClick(evt);
                    this._onCancelClick(evt);
                }
            },
            user: store.getState().user,
            children: {
                form: new UserEditForm({
                    ui,
                    events: {
                        submit: (evt: SubmitEvent) => this._onUserSubmit(evt)
                    }
                }),
                view: new UserView({
                    ui
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }

    private async _logout() {
        const result = await this._authService.logout();
        if (!hasError(result)) {
            this._router.navigate('/');
        }
    }

    private _onCancelClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.js-cancel') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.setProps({
                isEdit: false
            });
        }
    }

    private _onUserSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            this._userService.updateUser(form.value);
            this.setProps({isEdit: false});
        }
    }

    private _onEditClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.js-edit') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.setProps({isEdit: true});
        }
    }

    private _onLogoutClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.js-logout') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this._logout();
        }
    }
}
