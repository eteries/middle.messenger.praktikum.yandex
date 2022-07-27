export const Regex = {
    NAME: /^[A-ZА-ЯЁ][A-ZА-ЯЁa-zа-яё-]+$/,
    LOGIN: /^(?=.{3,20}$)[\d-_]*[a-zA-Z]+[\d-_]*/,
    EMAIL: /^[\w.-]+@[\w.-]+[A-Za-z0-9]+\.[A-Za-z]{2,4}$/,
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
    PHONE: /^(?=\+*\d+).{10,15}$/,
    NOT_EMPTY: /\S+/
};

export enum MethodHTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const API = 'https://ya-praktikum.tech/api/v2';
export const API_UPLOAD_PATH = `https://ya-praktikum.tech/api/v2/resources/`;
