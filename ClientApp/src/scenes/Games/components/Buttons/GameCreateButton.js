import React from 'react';

import { Toggle } from 'react-powerplug';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Fab,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import { generateDescription } from '../../../../extensions/DescriptionGenerator';
import GameCreateForm from '../Forms/GameCreateForm';

const useStyles = makeStyles({
    createFab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
});

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

export default function GameCreateButton() {
    const classes = useStyles();

    return (
        <div>
            <Toggle initial={false}>
                {({ on, toggle }) => (
                    <div>
                        <Fab className={classes.createFab} color="primary" aria-label="add" onClick={toggle}>
                            <AddIcon />
                        </Fab>
                        <Dialog open={on} onClose={toggle} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" onClose={toggle}>Create Game</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {generateDescription()}
                                </DialogContentText>
                                <GameCreateForm />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </Toggle>
        </div>
    );
};