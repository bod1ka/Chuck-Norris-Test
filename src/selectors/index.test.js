import { jokesSelector } from './index';

describe('jokesSelector', () => {

    it('should add required fields', () => {

        const state = {
            jokes: {
                jokes: getJokes(0, 5),
                favouriteJokes: getJokes(2, 7)
            }
        };

        const result = jokesSelector(state);

        const expected = [
            {
                id: 1,
                joke: 'test',
                isFavourite: false,
                canBeFavoured: true
            },
            {
                id: 2,
                joke: 'test',
                isFavourite: false,
                canBeFavoured: true
            },
            {
                id: 3,
                joke: 'test',
                isFavourite: true,
                canBeFavoured: false
            },
            {
                id: 4,
                joke: 'test',
                isFavourite: true,
                canBeFavoured: false
            },
            {
                id: 5,
                joke: 'test',
                isFavourite: true,
                canBeFavoured: false
            }
        ]

        expect(result).toEqual(expected);
    });
});

function getJokes(start, n) {
    const jokes = [];
    for (let i = start; i < n; i++) {
        jokes.push({
            id: i + 1,
            joke: 'test'
        });
    }
    return jokes;
}