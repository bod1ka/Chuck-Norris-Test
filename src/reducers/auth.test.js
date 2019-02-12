import auth from './auth';
import { AUTH_LOGOUT, AUTH_SUCCESSFUL } from '../constants';


describe('auth reducer', function () {


    it('should set is auth true',() => {
        const state = auth({
            isAuthenticated:false
        },{
            type:AUTH_SUCCESSFUL
        });

        expect(state).toEqual({
            isAuthenticated: true
        });
    });

    it('should set is auth false',() => {
        const state = auth({
            isAuthenticated:true
        },{
            type:AUTH_LOGOUT
        });

        expect(state).toEqual({
            isAuthenticated: false
        });
    });

});