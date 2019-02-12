import { combineReducers } from 'redux';
import jokes from './jokes';
import auth from './auth';


const createReducer = () => {
    const reducer = combineReducers({
        jokes,
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