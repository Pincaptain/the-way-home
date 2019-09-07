import {
    GET_GAMES,
    GET_GAME
} from '../types/Games';

const initialState = {
    games: [],
    game: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload
            };
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            }
        default:
            return state;
    }
}