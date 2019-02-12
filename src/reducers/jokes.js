import {
    ADD_FAVOURITE_JOKE,
    FETCH_FAVOURITE_START,
    FETCH_FAVOURITE_SUCCESS,
    FETCH_JOKES_FAIL,
    FETCH_JOKES_START,
    FETCH_JOKES_SUCCESS,
    REMOVE_FAVOURITE_JOKE
} from "../constants";

const initialState = {
    isFetching:false,
    favouriteJokes:[],
    jokes:[]
};

export default function jokesReducer(state = initialState, action){

    switch (action.type) {
        case ADD_FAVOURITE_JOKE:

            const favouriteItems = state.favouriteJokes;

            if (favouriteItems.length >= 10){
                return {
                    ...initialState,
                    ...state
                };
            }

            return {
                ...initialState,
                ...state,
                favouriteJokes: [...favouriteItems, action.joke]
            };
        case REMOVE_FAVOURITE_JOKE:

            return {
                ...initialState,
                ...state,
                favouriteJokes: state.favouriteJokes.filter(({id}) => {
                    return action.id !== id;
                })
            };
        case FETCH_JOKES_START:
            return {
                ...initialState,
                ...state,
                isFetching:true
            };
        case FETCH_JOKES_FAIL:
            return {
                ...initialState,
                ...state,
                isFetching:false
            };
        case FETCH_JOKES_SUCCESS:
            return {
                ...initialState,
                ...state,
                isFetching:false,
                jokes: action.jokes
            };
        case FETCH_FAVOURITE_START:
            return {
                ...initialState,
                ...state,
                isFetching:true
            };
        case FETCH_JOKES_FAIL:
            return {
                ...initialState,
                ...state,
                isFetching:false
            };
        case FETCH_FAVOURITE_SUCCESS:

            const favouriteJokes = state.favouriteJokes;

            if (favouriteJokes.length >= 10){
                return;
            }

            return {
                ...initialState,
                ...state,
                isFetching:false,
                favouriteJokes:[...favouriteJokes,...action.jokes]
            };
        default:
            return state;
    }
}
