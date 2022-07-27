import { APIError } from '../types/error';

export const hasError = <T>(response: T | APIError ): response is APIError => (
    response instanceof Object && response.reason !== undefined
);
