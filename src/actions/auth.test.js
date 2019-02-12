import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {authenticate, logout} from "./auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('#authenticate',() => {
   it ('should authenticate user',() =>{

       const store = mockStore({
           auth:{
               isAuthenticated: false
           }
       });

       store.dispatch((authenticate({login:'test',password:'test'})));

       const actions = store.getActions();
       const expected = {type:'AUTH_SUCCESSFUL'};

       expect(actions).toEqual([expected]);

   });
});

describe('#logout',() => {
    it ('should log out user',() =>{
        const store = mockStore({
            auth:{
                isAuthenticated:true
            }
        });

        store.dispatch((logout()));

        const actions = store.getActions();
        const expected = {type:'AUTH_LOGOUT'};

        expect(actions).toEqual([expected]);
    });
});
