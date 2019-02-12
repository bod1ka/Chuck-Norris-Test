export default function authReducer(state = {isAuthenticated: false}, action) {
    switch (action.type) {
        case 'AUTH_SUCCESSFUL':
            return {
                ...state,
                isAuthenticated: true
            };
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}