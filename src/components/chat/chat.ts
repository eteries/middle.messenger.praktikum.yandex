import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import plus from '../../partials/inline-svg/plus.hbs';
import trash from '../../partials/inline-svg/delete.hbs';
import check from '../../partials/inline-svg/double-check.hbs';
import MessageForm from '../message-form/message-form';
import { ChatDTO, ChatMessage } from '../../types/chat';
import MessageComponent from '../message/message';
import { Indexed } from '../../types/common';
import Modal from '../modal/modal';
import AddUser from '../add-user/add-user';
import ui from '../../data/ui.json';
import ChatService from '../../services/chat-service';

interface ChatProps {
    ui: any;
    user: any;
    chat: ChatDTO;
    id: number;
    events: {
        click: (evt: PointerEvent) => void
    }
}

export default class ChatComponent extends Block {
    private readonly _chatService: ChatService;

    constructor(props: ChatProps) {
        super(props);

        this._chatService = new ChatService();

        this._onSubmit = this._onSubmit.bind(this);
        this._onCloseClick = this._onCloseClick.bind(this);
    }

    public init() {
        const messages: Indexed = {};
        this.props.chat?.messages?.forEach((message: ChatMessage) => {
            messages[`message${message.id}`] = new MessageComponent(message)
        });

        this.setProps({
            children: {
                form: new MessageForm({
                    events: {
                        submit: (evt) => this._onSubmit(evt)
                    }
                }),
                add: new Modal({
                    ui,
                    events: {
                        click: (evt: PointerEvent) => this._onCloseClick(evt)
                    },
                    children: {
                        content: new AddUser({
                            ui,
                            events: {
                                submit: (evt: SubmitEvent) => this._onSubmit(evt),
                                click: (evt: PointerEvent) => this._onCloseClick(evt)

                            }
                        })
                    }
                }),
                messages
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, check, plus, trash});
    }

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.add.props.children.content;
        if (form.isValid) {
            console.log(form.value);
            this._chatService.addUser(form.value, this.props.id);
        }
    }

    private _onCloseClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.close') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.props.children.add.hide();
        }
    }
}
