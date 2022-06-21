import Block from '../../utils/block';
import templateFunction from './signup.hbs';

interface Error404Props {
    ui: any;
    user: any;
    events?: {
        submit?: (evt: SubmitEvent) => void
    }
}

export default class Error404 extends Block {
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
                form: new Error404Form({
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
