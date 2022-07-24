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

export default class UserPage extends Block {
    private readonly _authorizationService: AuthService;
    private readonly _router: Router;

    constructor() {
        super();

        this._authorizationService = new AuthService();
        this._router = new Router();

        this._authorizationService.getCurrentUser();

        store.on(StoreEvent.Updated, () => {
            this.setProps(store.getState());
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
                }
            },
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
        const result = await this._authorizationService.logout();
        if (!hasError(result)) {
            this._router.navigate('/');
        }
    }

    private _onUserSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }

    private _onEditClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.edit') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.setProps({isEdit: true});
        }
    }

    private _onLogoutClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.logout') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this._logout();
        }
    }
}
