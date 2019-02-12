import {createSelector} from "reselect";

const jokesSelector = createSelector(
    (state) => state.jokes.jokes,
    (state) => state.jokes.favouriteJokes.reduce((acc,{id}) => {
        acc[id] = true;
        return acc;
    },{}),
    (randomJokes,favouriteJokeIds) =>{
        const favouriteJokesLength = Object.keys(favouriteJokeIds).length;
        return randomJokes.map(({id,joke}) => {

            const isFavourite = favouriteJokeIds[id];

            return {
                id,
                joke,
                isFavourite,
                canBeFavoured: favouriteJokesLength < 10 && !isFavourite
            }
        });
    });

export {
    jokesSelector
};