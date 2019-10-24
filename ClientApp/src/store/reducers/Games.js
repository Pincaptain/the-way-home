import {
    GET_GAMES,
    GET_GAME,
    CREATE_GAME,
    UPDATE_GAME,
    DELETE_GAME
} from '../types/Games';

const initialState = {
    games: [],
    gamesLoading: true,
    game: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                gamesLoading: false
            };
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            };
        case CREATE_GAME:
            return {
                ...state,
                game: action.payload
            };
        case UPDATE_GAME:
            return state;
        case DELETE_GAME:
            return state;
        default:
            return state;
    }
};