import Router from '../utils/router';
import { Nullable } from '../types/common';

export default class ChatIdService {
    public id: Nullable<number>;
    private readonly _router: Router;

    constructor() {
        this._router = new Router();
        this.id = this.getId();
    }

    getId() {
        const params = new URL(this._router.location.href).searchParams;
        return params.has('id') ? Number(params.get('id')) : null;
    }
}
