import React from 'react';

import { Grid } from '@material-ui/core';

import GameCard from '../Cards/GameCard';

export default function GamesGrid(props) {
    const spacing = 4;

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {props.games.map(game =>
                            <Grid key={game.id} item>
                                <GameCard game={game} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};