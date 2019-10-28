import React, { Component } from 'react';

import { Box } from '@material-ui/core';

import GamesLoader from './components/Loaders/GamesLoader';
import GameCreateButton from './components/Buttons/GameCreateButton';

class Games extends Component {
    render() {
        return (
            <div>
                <Box m={5}>
                    <GameCreateButton />
                    <GamesLoader />
                </Box>
            </div>
        );
    };
}

export default Games;