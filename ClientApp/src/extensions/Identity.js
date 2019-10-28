import cookie from 'react-cookies';

import uuid from 'uuid';

export const identity = () => {
    let identity = cookie.load('identity');

    if (identity === undefined) {
        identity = createIdentity();
    }

    return identity;
};

export const createIdentity = () => {
    let identity = uuid.v4();

    cookie.save('identity', identity, {
        path: '/'
    });

    return identity;
};

export const destroyIdentity = () => {
    cookie.remove('identity');
};