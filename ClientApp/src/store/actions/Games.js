import { push } from 'react-router-redux';

import axios from 'axios';

import {
    GET_GAMES,
    GET_GAME,
    CREATE_GAME,
    UPDATE_GAME,
    DELETE_GAME
} from '../types/Games';

export const getGames = () => dispatch => {
    axios
        .get('/api/Games')
        .then(result => {
            dispatch({
                type: GET_GAMES,
                payload: result.data
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const getGame = (id) => dispatch => {
    axios
        .get(`/api/Games/${id}`)
        .then(result => {
            dispatch({
                type: GET_GAME,
                payload: result.data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const createGame = (game) => dispatch => {
    axios
        .post('/api/Games', game)
        .then(result => {
            dispatch({
                type: CREATE_GAME,
                payload: result.data
            });

            dispatch(push(`/games/${result.data.id}`));
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateGame = (game) => dispatch => {
    axios
        .put(`/api/Games/${game.id}`, game)
        .then(result => {
            dispatch({
                type: UPDATE_GAME,
                payload: result.data
            });

            dispatch(getGames());
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteGame = (id) => dispatch => {
    axios
        .delete(`/api/Games/${id}`)
        .then(result => {
            dispatch({
                type: DELETE_GAME,
                payload: result.data
            });

            dispatch(getGames());
        })
        .catch(error => {
            console.log(error);
        });
}