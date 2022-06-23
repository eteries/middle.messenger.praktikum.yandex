import Block from '../../utils/block';
import templateFunction from './sidebar.hbs';
import styles from '../../styles/sidebar.css';
import Input from '../input/input';
import { Regex } from '../../constants';
import { Contact } from '../../types/contact';

interface SidebarProps {
    contacts: Contact[];
}

export default class Sidebar extends Block {
    private _controls: Record<string, Block>;

    constructor(props: SidebarProps) {
        super(props);
    }

    public init() {
        this._controls = {
            search: new Input({
                message: 'not empty',
                label: '',
                type: 'text',
                pattern: Regex.MESSAGE
            })
        };
        this.setProps({
            children: {
                ...this._controls
            }
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, styles});
    }
}
