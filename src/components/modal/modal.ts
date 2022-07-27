import templateFunction from './modal.hbs';
import { Indexed } from '../../types/common';
import close from '../../partials/inline-svg/close.hbs';
import ui from '../../data/ui.json';
import Block from '../../utils/block';
import styles from './modal.css';

interface ModalProps {
    ui?: Indexed,
    title: string;
    events?: {
        click: (evt: PointerEvent) => void
    };
    children?: Indexed;
}

export default class Modal extends Block {
    constructor(props: ModalProps) {
        super(props);

        this.hide();
    }

    public init() {
        this.setProps({
            ui,
            styles,
            events: {
                click: (evt: PointerEvent) => this._onCloseClick(evt)
            }
        });
    }

    private _onCloseClick(evt: PointerEvent) {
        const target = this.element?.querySelector('.js-close') as HTMLElement;
        if (evt.composedPath().includes(target)) {
            this.hide();
        }
    }

    public close(evt: PointerEvent) {
        this._onCloseClick(evt);
    }

    public render() {
        return this.compile(templateFunction, {...this.props, close});
    }
}
