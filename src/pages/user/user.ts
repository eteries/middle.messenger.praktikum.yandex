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
import ChangePassword from '../../components/password-change/password-change';
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

        this._onClick = this._onClick.bind(this);
    }

    public init() {
        this.setProps({
            isEdit: false,
            isPasswordModalOpen: false,
            logo,
            left,
            styles,
            children: {
                form: new UserEditForm({
                    ui,
                    events: {
                        submit: (evt: SubmitEvent) => this._onSubmit(evt),
                        click: (evt: PointerEvent) => this._onClick(evt)
                    }
                }),
                view: new UserView({
                    ui,
                    events: {
                        click: (evt: PointerEvent) => this._onClick(evt),
                    }
                }),
                password: new ChangePassword({
                    ui,
                    events: {
                        submit: (evt: SubmitEvent) => this._onPasswordSubmit(evt)
                    }
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

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }

    private _onPasswordSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.password;
        if (form.isValid) {
            console.log(form.value);
        }
    }

    private _onClick(evt: PointerEvent) {
        const targetId = (evt.target as HTMLElement).id;
        switch (targetId) {
            case 'edit':
                this.setProps({isEdit: true});
                break;
            case 'password':
                this.setProps({isPasswordModalOpen: true});
                break;
            case 'logout':
                this._logout();
        }
    }
}
