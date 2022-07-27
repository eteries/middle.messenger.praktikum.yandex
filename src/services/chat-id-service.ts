import Router from '../utils/router';

export default class ChatIdService {
    private readonly _router: Router;

    constructor() {
        this._router = new Router();
    }

    get id() {
        const params = new URL(this._router.location.href).searchParams;
        return params.has('id') ? Number(params.get('id')) : null;
    }
}
