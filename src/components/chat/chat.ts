import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import plus from '../../partials/inline-svg/plus.hbs';
import trash from '../../partials/inline-svg/delete.hbs';
import check from '../../partials/inline-svg/double-check.hbs';
import MessageForm from '../message-form/message-form';
import { ChatMessageDTO, mapChatMessageDTOToChatMessage } from '../../types/chat';
import MessageComponent from '../message/message';
import Modal from '../modal/modal';
import AddUser from '../add-user/add-user';
import ui from '../../data/ui.json';
import ChatService from '../../services/chat-service';
import SocketService, { SocketEvent } from '../../services/chat-websocket-service';
import store from '../../store/store';
import { UserDTO } from '../../types/user';

interface ChatProps {
    ui: any;
    user: any;
    id: number;
    events: {
        click: (evt: PointerEvent) => void
    }
}

export default class ChatComponent extends Block {
    private readonly _chatService: ChatService;
    private  _socketService: SocketService;
    private readonly _user: UserDTO;
    private readonly _chatId: number;
    private _token: string | undefined;
    private _messages: MessageComponent[] = [];

    constructor(props: ChatProps) {
        super(props);

        this._chatService = new ChatService();

        this._user = store.getState().user;
        this._token = store.getState().token;
        this._chatId = props.id;

        if (this._user && this._chatId) {
            this._joinChat();
        }

        this._onMessageSubmit = this._onMessageSubmit.bind(this);
        this._onUserSubmit = this._onUserSubmit.bind(this);
        this._onCloseClick = this._onCloseClick.bind(this);

        this._socketService.on(SocketEvent.Message, (payload) => {
            if (Array.isArray(payload)) {
                this._messages = [
                    ...this._messages,
                    ...payload
                        .map((message: ChatMessageDTO) => new MessageComponent({message: mapChatMessageDTOToChatMessage(message)}))
                        .reverse()
                ];
            } else if(payload?.type === 'message') {
                this._messages = [
                    ...this._messages,
                    new MessageComponent({message: mapChatMessageDTOToChatMessage(payload)})
                ];

            }

            this.setProps({
                children: {
                    ...this.props.children,
                    messages: this._messages
                }
            })
        })
    }

    public init() {
        this.setProps({
            children: {
                form: new MessageForm({
                    events: {
                        submit: (evt) => this._onMessageSubmit(evt)
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
                                submit: (evt: SubmitEvent) => this._onUserSubmit(evt),
                                click: (evt: PointerEvent) => this._onCloseClick(evt)

                            }
                        })
                    }
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, check, plus, trash});
    }

    private _onMessageSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.form;
        if (form.isValid) {
            console.log(form.value);
            this._socketService.send(form.value.message);
        }
    }

    private _onUserSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.content;
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

    private async _joinChat() {
        if (this._socketService === undefined && this._token !== undefined ) {
            this._socketService = new SocketService(this._chatId, this._user.id, this._token);
        }

        this._socketService.on(SocketEvent.Open, () => {
            console.log('Chat comp::_joinChat::storeOnOpen')
            this._socketService.getMessages();
        });

    }
}
