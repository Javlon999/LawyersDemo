export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.data.token) {
        return { 'Authorization': 'Bearer ' + user.data.token };
    } else {
        return {};
    }
}
//user