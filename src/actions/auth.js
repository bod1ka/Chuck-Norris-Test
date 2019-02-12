import history from '../history';

export function authenticate({login,password}){
    return (dispatch) => {
        dispatch({
            type:'AUTH_SUCCESSFUL'
        });
    };
}

export function logout(){
    return (dispatch) => {
        dispatch({
            type:'AUTH_LOGOUT'
        });
        history.push('/');
    }
}