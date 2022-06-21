import Block from '../../utils/block';
import templateFunction from './signup.hbs';

interface UserEditProps {
    ui: any;
    user: any;
    events?: {
        submit?: (evt: SubmitEvent) => void
    }
}

export default class UserEdit extends Block {
    constructor(props: any) {
        super(props);
    }

    public render() {
        this._setContext();
        return this.compile(templateFunction, this.props);
    }

    private _setContext() {
        this.setProps({
            /*children: {
                form: new UserEditForm({
                    ui,
                    events: {
                        'submit': this.onSubmit
                    }
                })
            }*/
        });
    }

    private onSubmit(evt: SubmitEvent): void {
        evt.preventDefault();
        console.log(evt);
    }
}
