import {
    ADD_FAVOURITE_JOKE, FETCH_FAVOURITE_FAIL,
    FETCH_FAVOURITE_START,
    FETCH_FAVOURITE_SUCCESS,
    FETCH_JOKES_FAIL,
    FETCH_JOKES_START,
    FETCH_JOKES_SUCCESS, MAX_JOKES,
    REMOVE_FAVOURITE_JOKE
} from "../constants";

const initialState = {
    isFetching: false,
    favouriteJokes: [],
    jokes: []
};

export default function jokesReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_FAVOURITE_JOKE:
            return {
                ...state,
                favouriteJokes: [...state.favouriteJokes, action.joke]
            };
        case REMOVE_FAVOURITE_JOKE:
            return {
                ...state,
                favouriteJokes: state.favouriteJokes.filter(({id}) => {
                    return action.id !== id;
                })
            };
        case FETCH_FAVOURITE_START:
        case FETCH_JOKES_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_FAVOURITE_FAIL:
        case FETCH_JOKES_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case FETCH_JOKES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                jokes: action.jokes
            };
        case FETCH_FAVOURITE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                favouriteJokes: [...state.favouriteJokes, ...action.jokes].slice(0,MAX_JOKES)
            };
        default:
            return state;
    }
}
