import Block from '../../utils/block';
import templateFunction from './user-view.hbs';
import store, { StoreEvent } from '../../store/store';
import { BlockEvent } from '../../utils/events.enum';

interface UserViewProps {
    ui: any;
    events?: {
        click?: (evt: MouseEvent) => void
    }
}

export default class UserView extends Block {
    constructor(props: UserViewProps) {
        super(props);

        store.on(StoreEvent.Updated, () => {
            this.setProps({
                user: store.getState().user
            });
            this._eventBus().emit(BlockEvent.FLOW_CDU);
        });
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
