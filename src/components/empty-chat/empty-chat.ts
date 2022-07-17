import Block from '../../utils/block';
import templateFunction from './empty-chat.hbs';
import chat from '../../assets/img/chat.svg';
import logo from '../../assets/img/logo-taper.svg';
import styles from '../../pages/chat/chat.css';
import ui from '../../data/ui.json';
import CreateChat from '../create-chat/create-chat';
import ChatService from '../../services/chat-service';

interface EmptyChatProps {
    message: string;
    create: string;
}

export default class EmptyChat extends Block {
    private _chatService: ChatService;

    constructor(props: EmptyChatProps) {
        super(props);
        this._chatService = new ChatService();

        this._closeModal = this._closeModal.bind(this);
    }

    public init() {
        this.setProps({
            isModalOpen: false,
            logo,
            styles,
            events: {
                click: (evt: PointerEvent) => this._openModal(evt)
            },
            children: {
                create: new CreateChat({
                    onClose: () => this._closeModal(),
                    events: {
                        submit: (evt: SubmitEvent) => this._onSubmit(evt)
                    },
                    ui
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, chat});
    }

    private _closeModal() {
        this.props.isModalOpen = false;
    }

    private _openModal(evt: PointerEvent) {
        if ((evt.target as HTMLElement).id === 'create') {
            this.props.isModalOpen = true;
        }
    }

    private _onSubmit(evt: SubmitEvent) {
        evt.preventDefault();
        const form = this.props.children.add;
        if (form.isValid) {
            this._chatService.createChat(form.value);
            this._closeModal();
        }
    }
}
