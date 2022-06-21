import Block from '../../utils/block';
import templateFunction from './chat.hbs';
import EmptyChat from '../../components/empty-chat/empty-chat';
import ChatComponent from '../../components/chat/chat';
import ui from '../../data/ui.json';
import data from '../../data/data.json';
import logo from '../../assets/img/logo-taper.svg';
import Sidebar from '../../components/sidebar/sidebar';
import styles from '../../styles/chat.css';

export default class Chat extends Block {
    constructor(props: any) {
        super(props);
        this._setChildren();
    }

    public render() {
        return this.compile(templateFunction, this._state);
    }

    private _setChildren() {
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
                    data
                }),
                sidebar: new Sidebar({
                    ui,
                    data
                })
            }
        });
    }
}
