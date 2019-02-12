import { combineReducers } from 'redux';
import auth from './auth';


const createReducer = () => {
    const reducer = combineReducers({
        auth
    });
    return (state, action) => {
        if (action.type === 'AUTH_LOGOUT') {
            state = undefined;
        }
        return reducer(state, action);
    };
};

export default createReducer();