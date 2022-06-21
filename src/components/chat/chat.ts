import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import plus from '../../partials/inline-svg/plus.hbs';
import del from '../../partials/inline-svg/delete.hbs';
import check from '../../partials/inline-svg/double-check.hbs';
import arrow from '../../partials/inline-svg/arrow-right.hbs';
import styles from '../../styles/message.css';

interface ChatProps {
    ui: any;
    user: any;
}

export default class Chat extends Block {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...this.props, styles, plus, del, arrow, check});
    }

    private _setContext() {
        this.setProps({
            /*children: {
                form: new ChatForm({
                    ui,
                    events: {
                        'submit': this.onSubmit
                    }
                })
            }*/
        });
    }
}
