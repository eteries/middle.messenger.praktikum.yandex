import templateFunction from './modal.hbs';
import { Indexed } from '../../types/common';
import close from '../../partials/inline-svg/arrow-right.hbs';
import ui from '../../data/ui.json';
import Block from '../../utils/block';

interface ModalProps {
    ui: Indexed,
    events: {
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
            ui
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props, close});
    }
}
