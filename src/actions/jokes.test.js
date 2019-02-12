import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getFavouriteJokes, getRandomJokes } from "./jokes";
import {
    FETCH_FAVOURITE_FAIL,
    FETCH_FAVOURITE_START,
    FETCH_FAVOURITE_SUCCESS,
    FETCH_JOKES_FAIL,
    FETCH_JOKES_START,
    FETCH_JOKES_SUCCESS
} from "../constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('#getRandomJokes', () => {

    beforeEach(() => {
        fetch.resetMocks()
    });

    it('should get random jokes', () => {
        const store = mockStore({
            auth: {
                isAuthenticated: false
            },
            jokes: {
                isFetching: false,
                favouriteJokes: [],
                jokes: []
            }
        });


        const jokesFixture = getJokes(10);

        fetch.mockResponseOnce(JSON.stringify({
            value: jokesFixture
        }));


        return store.dispatch((getRandomJokes()))
            .then(() => {
                const actions = store.getActions();
                const expected = [
                    {type: FETCH_JOKES_START},
                    {type: FETCH_JOKES_SUCCESS, jokes: jokesFixture}
                ];

                expect(actions).toEqual(expected);
            });
    });

    it('should fail', () => {
        const store = mockStore({
            auth: {
                isAuthenticated: false
            },
            jokes: {
                isFetching: false,
                favouriteJokes: [],
                jokes: []
            }
        });


        fetch.mockRejectOnce();


        return store.dispatch((getRandomJokes()))
            .catch(() => {
                const actions = store.getActions();
                const expected = [
                    {type: FETCH_JOKES_START},
                    {type: FETCH_JOKES_FAIL}
                ];

                expect(actions).toEqual(expected);
            });
    });
});

describe('#getFavouriteJokes', () => {

    beforeEach(() => {
        fetch.resetMocks()
    });

    it('should get random jokes', () => {
        const store = mockStore({
            auth: {
                isAuthenticated: false
            },
            jokes: {
                isFetching: false,
                favouriteJokes: [],
                jokes: []
            }
        });


        const jokesFixture = getJokes(1);

        fetch.mockResponseOnce(JSON.stringify({
            value: jokesFixture
        }));


        return store.dispatch((getFavouriteJokes()))
            .then(() => {
                const actions = store.getActions();
                const expected = [
                    {type: FETCH_FAVOURITE_START},
                    {type: FETCH_FAVOURITE_SUCCESS, jokes: jokesFixture}
                ];

                expect(actions).toEqual(expected);
            });
    });

    it('should fail', () => {
        const store = mockStore({
            auth: {
                isAuthenticated: false
            },
            jokes: {
                isFetching: false,
                favouriteJokes: [],
                jokes: []
            }
        });


        fetch.mockRejectOnce();


        return store.dispatch((getFavouriteJokes()))
            .catch(() => {
                const actions = store.getActions();
                const expected = [
                    {type: FETCH_FAVOURITE_START},
                    {type: FETCH_FAVOURITE_FAIL}
                ];

                expect(actions).toEqual(expected);
            });
    });
});


function getJokes(n) {
    const jokes = [];
    for (let i = 0; i < n; i++) {
        jokes.push({
            id: i + 1,
            joke: `test${i + 1}`
        });
    }
    return jokes;
}