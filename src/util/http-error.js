export function checkStatus(res) {
    if (!(res.status >= 200 && res.status < 300)) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
    }
    return res;
}