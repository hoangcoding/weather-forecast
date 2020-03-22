export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse((localStorage.getItem('user') as string));

    if (user && user.token) {
        return 'Bearer ' + user.token.accessToken;
    } else {
        return {};
    }
}
