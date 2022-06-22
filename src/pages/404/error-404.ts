import Block from '../../utils/block';
import templateFunction from './error-404.hbs';
import img from '../../assets/img/error-status.svg';
import styles from '../../styles/common/errors.css';
import ui from '../../data/ui.json';

export default class Error404 extends Block {
    constructor() {
        super();
    }

    public init() {
        this.setProps({
            message: "The page is not found",
            img,
            styles,
            ui
        })
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
