export const delay = (time) => {
    return new Promise((res, _rej) => {
        setTimeout(() => {
            res();
        }, time);
    });
};
