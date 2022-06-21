import Block from '../../utils/block';
import templateFunction from './user.hbs';
import ui from '../../data/ui.json';
import UserForm from '../../components/user-edit/user-edit-form.hbs';
import UserView from '../../components/user-view/user-view.hbs';
import { PropsObject } from '../../utils/types';
import styles from '../../styles/login.css';
import logo from '../../assets/img/logo-taper.svg';

export default class User extends Block {
    private _pageContext: PropsObject;

    constructor(props: any) {
        super(props);
    }

    public render() {
        this._setContext();
        return this.compile(templateFunction, this._pageContext);
    }

    private _setContext() {
        this._pageContext = {
            ui,
            styles,
            logo,
            children: {
                form: new UserForm({
                    ui,
                    events: {
                        'submit': this.onSubmit
                    }
                })
            }
        };
    }

    private onSubmit(evt: SubmitEvent): void {
        evt.preventDefault();
        console.log(evt);
    }
}
