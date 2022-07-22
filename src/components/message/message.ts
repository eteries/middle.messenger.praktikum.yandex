import Block from '../../utils/block';
import templateFunction from './message.hbs';
import styles from './message.css';
import check from '../../partials/inline-svg/double-check.hbs';
import { ChatMessage } from '../../types/chat';

interface MessageProps {
    message: ChatMessage;
}

export default class MessageComponent extends Block {
    private _messageClass: string;

    constructor(props: MessageProps) {
        super(props);

        this.init();
    }

    public init() {
        this._messageClass = this.props.message.isMine
            ? 'chat-message'
            : 'chat-message chat-message--answer';
        this.setProps({
            check,
            styles,
            messageClass: this._messageClass
        })
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
