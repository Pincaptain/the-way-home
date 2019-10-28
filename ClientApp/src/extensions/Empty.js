import { isNil } from './Nil';

export const isEmpty = (obj) => {
    if (isNil(obj)) {
        return true;
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
};