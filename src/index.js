import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-4-grid/css/grid.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './index.css';

import * as serviceWorker from './serviceWorker';
import configureStore from "./store";
import {Provider} from "react-redux";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import history from './history';

import {NotFound} from "./components";
import {JokesListContainer, FavouriteJokesListContainer} from "./containers";
import App from "./App";


const initialState = restoreInitialStoreState();

const store = configureStore(initialState);

trackStoreState(store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <App>
                    <Switch>
                        <Route exact path="/" component={JokesListContainer} />
                        <Route path="/favourite" component={FavouriteJokesListContainer} />
                    </Switch>
                </App>
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


function restoreInitialStoreState(){
    let initialState = {
        auth:{
            isAuthenticated: window.sessionStorage.getItem('isAuthenticated') === 'true'
        }
    };

    let savedState = window.sessionStorage.getItem('state');

    if (savedState){
        try {
            savedState = JSON.parse(savedState);
            initialState = {...initialState,savedState};
        }catch(e){
            console.error(e);
        }
    }
    return initialState;
}

function trackStoreState(store){
    let previousState;

    store.subscribe(()=>{
        const {
            jokes
        } = store.getState();

        if (previousState === jokes){
            return;
        }

        previousState = jokes;

        window.sessionStorage.setItem('state', JSON.stringify({
            jokes:{
                isFetching:false,
                errors:[],
                jokes:[],
                favouriteJokes:jokes.favouriteJokes
            }
        }));
    });
}