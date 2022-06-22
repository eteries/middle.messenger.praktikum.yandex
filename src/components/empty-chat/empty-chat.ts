import Block from '../../utils/block';
import templateFunction from './empty-chat.hbs';
import chat from '../../assets/img/chat.svg';

interface EmptyChatProps {
    message: string;
}

export default class EmptyChat extends Block {
    constructor(props: EmptyChatProps) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...this.props, chat});
    }
}
