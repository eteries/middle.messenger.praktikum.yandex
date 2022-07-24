import Block from '../../utils/block';
import templateFunction from './empty-chat.hbs';
import chat from '../../assets/img/chat.svg';
import logo from '../../assets/img/logo-taper.svg';
import styles from '../../pages/chat/chat.css';
import ui from '../../data/ui.json';
import CreateChat from '../create-chat/create-chat';
import ChatService from '../../services/chat-service';
import Modal from '../modal/modal';

interface EmptyChatProps {
    message: string;
    create: string;
}

export default class EmptyChat extends Block {
    private _chatService: ChatService;

    constructor(props: EmptyChatProps) {
        super(props);
        this._chatService = new ChatService();

        this._onSubmit = this._onSubmit.bind(this);
    }

    public init() {
        this.setProps({
            logo,
            styles,
            events: {
                click: (evt: PointerEvent) => this._onCreateClick(evt)
            },
            children: {
                create: new Modal({
                    title: 'Create a new chat',
                    children: {
                        content: new CreateChat({
                            events: {
                                submit: (evt: SubmitEvent) => this._onSubmit(evt)
                            },
                            ui
                        })
                    }
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, chat});
    }

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const modal = this.props.children.create;
        const form = modal.props.children.content;

        if (form.isValid) {
            this._chatService.createChat(form.value);
            this.props.children.create.hide();
        }
    }

    private _onCreateClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.create') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.props.children.create.show();
        }
    }
}
