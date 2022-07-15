import { Indexed } from '../types/common';

function isObject(object: Indexed | unknown):object is Indexed {
    return typeof object === 'object' && object !== null
}

export function isEqual(lhs: object, rhs: object): boolean {
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

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }

    }
    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (!isObject(object)) {
        return object;
    }

    const arr = path.split('.');
    const newObject = arr.reduceRight((acc: Indexed, key: string, index: number): Indexed => {
        if (index === arr.length - 1) {
            acc[key] = value as Indexed;
            return acc;
        }
        return {
            [key]: acc
        } as Indexed;
    }, {})

    return merge(object, newObject);
}
