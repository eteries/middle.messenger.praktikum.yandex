import Block from '../../utils/block';
import templateFunction from './user.hbs';
import ui from '../../data/ui.json';
import user from '../../data/user.json';
import logo from '../../assets/img/logo-taper.svg';
import UserEditForm from '../../components/user-edit/user-edit-form';
import UserView from '../../components/user-view/user-view';
import left from '../../partials/inline-svg/arrow-left.hbs';
import styles from './user.css';

export default class UserPage extends Block {
    constructor() {
        super();
    }

    public init() {
        this.setProps({
            isEdit: true,
            logo,
            left,
            styles,
            children: {
                form: new UserEditForm({
                    ui,
                    events: {
                        submit: (evt: SubmitEvent) => this._onSubmit(evt)
                    }
                }),
                view: new UserView({
                    ui,
                    user
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }
}
