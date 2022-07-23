import Block from '../../utils/block';
import templateFunction from './message.hbs';
import styles from './message.css';
import check from '../../partials/inline-svg/double-check.hbs';
import { ChatMessage } from '../../types/chat';
import { formatChatMessageDate } from '../../utils/date';

interface MessageProps {
    message: ChatMessage;
}

export default class MessageComponent extends Block {
    private _messageClass: string;
    private _formattedDate: string;

    constructor(props: MessageProps) {
        super(props);

        this.init();
    }

    public init() {
        this._messageClass = this.props.message.isMine
            ? 'chat-message'
            : 'chat-message chat-message--answer';
        this._formattedDate = formatChatMessageDate(this.props.message.time);
        this.setProps({
            check,
            styles,
            messageClass: this._messageClass,
            formattedDate: this._formattedDate
        })
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
