import HTTPTransport from '../utils/http';

export default class ChatApiService {
    private _http: HTTPTransport = new HTTPTransport();
    private _url: string;

    public getChats() {
        return this._http.get<[]>(this._url);
    }
}
