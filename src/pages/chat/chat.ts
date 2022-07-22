import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import EmptyChat from '../../components/empty-chat/empty-chat';
import ChatComponent from '../../components/chat/chat';
import ui from '../../data/ui.json';
import logo from '../../assets/img/logo-taper.svg';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './chat.css';
import ChatService from '../../services/chat-service';
import store, { StoreEvent } from '../../store/store';
import { BlockEvent } from '../../utils/events.enum';
import { Nullable } from '../../types/common';
import ChatIdService from '../../services/chat-id-service';

export default class ChatPage extends Block {
    private readonly _chatService: ChatService;
    private readonly _chatIdService: ChatIdService;
    private readonly _chatId: Nullable<number>;

    public constructor() {
        super();

        this._chatService = new ChatService();
        this._chatService.getChats();

        this._chatIdService = new ChatIdService();
        this._chatId = this._chatIdService.id;

        if (store.getState().token === undefined && this._chatId !== null) {
            this._chatService.createToken(this._chatId);
        }

        store.on(StoreEvent.Updated, () => {
            const { chats, chat, user, token } = store.getState();
            this.setProps({chats, chat, user});

            this.init();

            if (this.props.chats?.length > 0 && this._chatId !== null && token !== undefined) {
                this.setProps({
                    isEmpty: false,
                    children: {
                        ...this.props.children,
                        chat: new ChatComponent({
                            ui,
                            user,
                            id: this._chatId as number,
                            events: {
                                click: (evt) => this._onClick(evt)
                            }
                        })
                    }
                })
            }

            this._eventBus().emit(BlockEvent.FLOW_CDU);
        });
    }

    public init() {
        this.setProps({
            isEmpty: true,
            logo,
            styles,
            children: {
                empty: new EmptyChat({
                    message: ui.chats.empty,
                    create: ui.chats.create,
                }),
                sidebar: new Sidebar({
                    ui,
                    chats: this.props.chats
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }

    private _onClick(evt: PointerEvent) {
        const target = evt.composedPath().find((item: HTMLElement) => item.tagName === 'BUTTON');
        if ((target as HTMLButtonElement)?.id === undefined) {
            return;
        }

        switch ((target as HTMLButtonElement).id) {
            case 'add':
                this.props.children.chat.props.children.add.show();
                break;
            case 'remove':
                this.props.children.chat.props.children.remove.show();
        }
    }
}
