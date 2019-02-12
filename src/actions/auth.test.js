import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {authenticate, logout} from "./auth";
import history from '../history';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('#authenticate',() => {
   it ('should authenticate user',() =>{

       jest.spyOn(window.sessionStorage.__proto__, 'setItem');
       window.sessionStorage.__proto__.setItem = jest.fn();

       const store = mockStore({
           auth:{
               isAuthenticated: false
           }
       });

       store.dispatch((authenticate({login:'test',password:'test'})));

       const actions = store.getActions();
       const expected = {type:'AUTH_SUCCESSFUL'};

       expect(actions).toEqual([expected]);
       expect(window.sessionStorage.setItem).toHaveBeenCalledWith('isAuthenticated','true');
   });
});

describe('#logout',() => {
    it ('should log out user',() =>{
        const store = mockStore({
            auth:{
                isAuthenticated:true
            }
        });

        jest.spyOn(history,'push');

        store.dispatch((logout()));

        const actions = store.getActions();
        const expected = {type:'AUTH_LOGOUT'};

        expect(actions).toEqual([expected]);
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
