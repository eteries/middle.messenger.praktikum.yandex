import { Indexed } from '../types/common';

function isObject(object: Indexed | unknown):object is Indexed {
    return typeof object === 'object' && object !== null
}

function isEqual(lhs: object, rhs: object): boolean {
    if (lhs === rhs) {
        return true;
    }

    if (!isObject(lhs) || !isObject(rhs)) {
        return false;
    }

    const keysA = Reflect.ownKeys(lhs);
    const keysB = Reflect.ownKeys(rhs);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (
            !Reflect.has(rhs, keysA[i]) ||
            !isEqual(lhs[keysA[i] as string], rhs[keysA[i] as string])
        ) {
            return false;
        }
    }

    return true;
}
