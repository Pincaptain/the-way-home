import React, { Component } from 'react';

import { Box } from '@material-ui/core';

import GamesGrid from './components/GamesGrid';
import GameCreateButton from './components/GameCreateButton';

class Games extends Component {
    render() {
        return (
            <div>
                <Box m={5}>
                    <GameCreateButton />
                    <GamesGrid />
                </Box>
            </div>
        );
    };
}

export default Games;