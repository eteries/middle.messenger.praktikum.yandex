import { MethodHTTP } from '../constants';
import { RequestOptions } from '../types/common';

function queryStringify(data: Record<string, string>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export default class HTTPTransport {
    public get = <T>(url: string, options: RequestOptions = {}): Promise<T> =>
        this._request<T>(url, {...options, method: MethodHTTP.GET}, options.timeout);

    public post = <T>(url: string, options: RequestOptions = {}): Promise<T> =>
        this._request<T>(url, {...options, method: MethodHTTP.POST}, options.timeout);

    public put = <T>(url: string, options: RequestOptions = {}): Promise<T> =>
        this._request<T>(url, {...options, method: MethodHTTP.PUT}, options.timeout);

    public delete = <T>(url: string, options: RequestOptions = {}): Promise<T> =>
        this._request<T>(url, {...options, method: MethodHTTP.DELETE}, options.timeout);

    private _request = <T>(url: string, options: RequestOptions = {}, timeout = 5000): Promise<T> => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            const isGet = method === MethodHTTP.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                try {
                    resolve(JSON.parse(xhr.response));
                }
                catch {
                    resolve(xhr.response)
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else if(options?.headers && options.headers['content-type'] === 'application/json') {
                xhr.send(JSON.stringify(data))
            } else {
                xhr.send(data);
            }
        });
    };
}
