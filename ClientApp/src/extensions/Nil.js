export const isNil = (value) => {
    let nil = false;

    if (value === undefined) {
        nil = true;
    }

    if (value === null) {
        nil = true;
    }

    return nil;
};