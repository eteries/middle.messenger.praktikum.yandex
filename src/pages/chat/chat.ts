import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import EmptyChat from '../../components/empty-chat/empty-chat';
import ChatComponent from '../../components/chat/chat';
import ui from '../../data/ui.json';
import user from '../../data/ui.json';
import data from '../../data/data.json';
import logo from '../../assets/img/logo-taper.svg';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './chat.css';

export default class ChatPage extends Block {
    constructor() {
        super();
    }

    public init() {
        this.setProps({
            isEmpty: false,
            logo,
            styles,
            children: {
                empty: new EmptyChat({
                    message: ui.chats.empty
                }),
                chat: new ChatComponent({
                    ui,
                    user,
                    chat: data.chat
                }),
                sidebar: new Sidebar({
                    ui,
                    data
                })
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
