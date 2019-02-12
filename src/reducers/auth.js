export default function authReducer(state = {isAuthenticated:false}, action){
    switch (action.type) {
        case 'AUTH_SUCCESSFUL':
            //emulate auth
            window.sessionStorage.setItem('isAuthenticated','true');
            return {
                ...state,
                isAuthenticated:true
            };
        case 'AUTH_LOGOUT':
            window.sessionStorage.removeItem('isAuthenticated');
            return {
                ...state,
                isAuthenticated:false
            };
        default:
            return state;
    }
}