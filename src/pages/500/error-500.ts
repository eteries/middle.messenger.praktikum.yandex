import Block from '../../utils/block';
import templateFunction from './error-500.hbs';
import img from '../../assets/img/error-status.svg';
import styles from '../../styles/common/errors.css';
import ui from '../../data/ui.json';

export default class Error500 extends Block {
    constructor() {
        super();
    }

    public init() {
        this.setProps({
            message: "Service is unavailable",
            img,
            styles,
            ui
        })
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
