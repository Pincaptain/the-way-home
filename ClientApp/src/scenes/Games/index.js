import React, { Component } from 'react';

import { Box } from '@material-ui/core';

import GameCreateButton from './components/Buttons/GameCreateButton';
import GamesLoader from './components/Loaders/GamesLoader';

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