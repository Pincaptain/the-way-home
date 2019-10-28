import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Typography,
    CardContent,
    CardActions
} from '@material-ui/core';

import GameDeleteButton from '../Buttons/GameDeleteButton';
import GameJoinButton from '../Buttons/GameJoinButton';
import GameUpdateButton from '../Buttons/GameUpdateButton';

const useStyles = makeStyles({
    card: {
        minWidth: 275 ,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    description: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '11rem'
    }
});

export default function GameCard(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Players: {props.game.playersCount}
                    </Typography>
                    <Typography variant="h5" component="h2"></Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.game.name}
                    </Typography>
                    <Typography className={classes.description} variant="body2" component="p">
                        {props.game.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <GameJoinButton game={props.game} />
                    <GameUpdateButton game={props.game} />
                    <GameDeleteButton game={props.game} />
                </CardActions>
            </Card>
        </div>
    );
};