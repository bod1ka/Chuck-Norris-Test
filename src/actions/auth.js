import history from '../history';

export function authenticate({login, password}) {
    return (dispatch) => {
        dispatch({
            type: 'AUTH_SUCCESSFUL'
        });
        window.sessionStorage.setItem('isAuthenticated', 'true');

    };
}

export function logout() {
    return (dispatch) => {
        dispatch({
            type: 'AUTH_LOGOUT'
        });
        window.sessionStorage.removeItem('isAuthenticated');
        history.push('/');
    }
}