import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@material-ui/core';

export default function GameJoinButton(props) {
    return (
        <div>
            <Button size="small" component={NavLink} to={`/games/${props.game.id}`}>
                Join
            </Button>
        </div>
    )
};