import {
    ADD_FAVOURITE_JOKE,
    FETCH_FAVOURITE_FAIL, FETCH_FAVOURITE_START,
    FETCH_FAVOURITE_SUCCESS,
    FETCH_JOKES_FAIL,
    FETCH_JOKES_START,
    FETCH_JOKES_SUCCESS,
    GET_JOKES_ENDPOINT,
    REMOVE_FAVOURITE_JOKE
} from "../constants";

import {checkStatus} from "../util";

export function addFavourite(joke){
    return {
        type:ADD_FAVOURITE_JOKE,
        joke
    };
}

export function removeFavourite(id){
    return {
        type:REMOVE_FAVOURITE_JOKE,
        id
    };
}

export function getFavouriteJokes(){
    return (dispatch) => {

        dispatch({
            type: FETCH_FAVOURITE_START
        });


        return fetchRandomJokes(1)
            .then((jokes) => {
                dispatch({
                    type: FETCH_FAVOURITE_SUCCESS,
                    jokes
                });
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: FETCH_FAVOURITE_FAIL
                });
                throw err;
            });
    }
}

export function getRandomJokes(number = 10){
    return (dispatch) => {

        dispatch({
            type: FETCH_JOKES_START
        });

        return fetchRandomJokes(number)
            .then((jokes) => {
                dispatch({
                    type: FETCH_JOKES_SUCCESS,
                    jokes
                });
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: FETCH_JOKES_FAIL
                });
                throw err;
            });
    }
}

function fetchRandomJokes(n){
    return fetch(`${GET_JOKES_ENDPOINT}/${n}`)
        .then(checkStatus)
        .then(response => response.json())
        .then((data) => {
            const jokes = data.value.map(({id,joke}) => {
                return {
                    id,
                    joke
                }
            });
            return jokes;
        });
}