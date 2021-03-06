import Block from '../../utils/block';
import templateFunction from './user-view.hbs';

interface UserViewProps {
    ui: any;
    user: any;
    events?: {
        submit?: (evt: SubmitEvent) => void
    }
}

export default class UserView extends Block {
    constructor(props: UserViewProps) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
