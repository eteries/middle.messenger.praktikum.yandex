export const Regex = {
    NAME: /[A-ZА-ЯЁ][a-zа-яё-]/,
    LOGIN: /^(?=.{3,7}$)[\d-_]*[a-zA-Z]+[\d-_]*/,
    EMAIL: /^[\w.-]+@[\w.-]+[A-Za-z0-9]+\.[A-Za-z]{2,4}$/,
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
    PHONE: /^(?=\+*\d+).{10,15}$/,
    MESSAGE: /\S+/
};

export enum MethodHTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
