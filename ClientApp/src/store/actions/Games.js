import axios from 'axios';

import {
    GET_GAMES,
    GET_GAME
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