import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import plus from '../../partials/inline-svg/plus.hbs';
import del from '../../partials/inline-svg/delete.hbs';
import check from '../../partials/inline-svg/double-check.hbs';
import MessageForm from '../message-form/message-form';
import { Chat, ChatMessage } from '../../types/chat';
import MessageComponent from '../message/message';
import { ChildrenObject, PropsObject } from '../../types/common';

interface ChatProps {
    ui: any;
    user: any;
    chat: Chat;
}

export default class ChatComponent extends Block {
    constructor(props: any) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    public init() {
        const messages: PropsObject = {};
        this.props.chat.messages.forEach((message: ChatMessage) => {
            messages[`message${message.id}`] = new MessageComponent(message)
        });

        this.setProps({
            children: {
                form: new MessageForm({
                    events: {
                        'submit': (evt) => this._onSubmit(evt)
                    }
                }),
                messages
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, check, plus, del});
    }

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
        }
    }
}
