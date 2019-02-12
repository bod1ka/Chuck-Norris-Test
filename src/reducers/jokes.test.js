import jokes from './jokes';
import { ADD_FAVOURITE_JOKE, FETCH_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_JOKE } from '../constants';


describe('jokes reducer', function () {


    it('should add on joke ADD_FAVOURITE_JOKE', () => {
        const initialState = {
            isFetching: false,
            jokes: [
                {
                    id: 1,
                    joke: 'test'
                }
            ],
            favouriteJokes: []
        };
        const state = jokes(initialState, {
            type: ADD_FAVOURITE_JOKE,
            joke: {
                id: 1,
                joke: 'test'
            }
        });

        expect(state.favouriteJokes).toEqual([
            {
                id: 1,
                joke: 'test'
            }
        ]);
    });

    it('should not add on joke ADD_FAVOURITE_JOKE', () => {

        const jokesFixture = getJokes(10);

        const initialState = {
            isFetching: false,
            jokes: [
                {
                    id: 1,
                    joke: 'test'
                }
            ],
            favouriteJokes: jokesFixture
        };
        const state = jokes(initialState, {
            type: ADD_FAVOURITE_JOKE,
            joke: {
                id: 11,
                joke: 'test'
            }
        });

        expect(state.favouriteJokes).toEqual(jokesFixture);
    });

    it('should remove item on REMOVE_FAVOURITE action', () => {
        const initialState = {
            isFetching: false,
            jokes: [],
            favouriteJokes: [
                {
                    id: 1,
                    joke: 'test'
                }
            ]
        };
        const state = jokes(initialState, {
            type: REMOVE_FAVOURITE_JOKE,
            id: 1
        });

        expect(state.favouriteJokes).toEqual([]);
    });

    it('should handle FETCH_FAVOURITE_SUCCESS',() => {

        const jokesFixture =  [
            {
                id: 1,
                joke: 'test'
            }
        ];

        const initialState = {
            isFetching: false,
            jokes: [],
            favouriteJokes: jokesFixture
        };

        const newJokes =  [{
            type: FETCH_FAVOURITE_SUCCESS,
            id: 2
        }];

        const expected = jokesFixture.concat(newJokes);

        const state = jokes(initialState, {
            type:FETCH_FAVOURITE_SUCCESS,
            jokes:newJokes
        });

        expect(state.favouriteJokes).toEqual(expected);
    });
});

function getJokes(n) {
    const jokes = [];

    for (let i = 0; i < n; i++) {
        jokes.push({
            id: i + 1,
            joke: 'test'
        });
    }

    return jokes;
}