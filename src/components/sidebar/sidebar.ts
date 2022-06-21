import Block from '../../utils/block';
import templateFunction from './sidebar.hbs';
import styles from '../../styles/sidebar.css';

interface SidebarProps {
    ui: any;
    user: any;
}

export default class Sidebar extends Block {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...this.props, styles});
    }

    private _setContext() {
        this.setProps({
            /*children: {
                form: new SidebarForm({
                    ui,
                    events: {
                        'submit': this.onSubmit
                    }
                })
            }*/
        });
    }
}
