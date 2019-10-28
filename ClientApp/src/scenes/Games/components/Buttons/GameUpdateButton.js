import React from 'react';

import { Toggle } from 'react-powerplug';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import { generateDescription } from '../../../../extensions/DescriptionGenerator';
import GameUpdateForm from '../Forms/GameUpdateForm';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function GameUpdateButton(props) {
    return (
        <div>
            <Toggle initial={false}>
                {({ on, toggle }) => (
                    <div>
                        <Button size='small' onClick={toggle}>
                            Update
                        </Button>
                        <Dialog open={on} onClose={toggle} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" onClose={toggle}>Update Game</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {generateDescription()}
                                </DialogContentText>
                                <GameUpdateForm game={props.game} toggle={toggle} />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </Toggle>
        </div>
    );
};