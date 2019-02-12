import {createSelector} from "reselect";
import {MAX_JOKES} from "../constants";

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
                canBeFavoured: favouriteJokesLength < MAX_JOKES && !isFavourite
            }
        });
    });

export {
    jokesSelector
};