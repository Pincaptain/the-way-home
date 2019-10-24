import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({    
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration:'none',
        color:'white',
        '&:hover':{
            textDecoration:'none',
            color:'white',
        },
    },
    navLink: {
        color:'white',
        '&:hover': {
            color:'white',
        },
        '& a:hover': {
            color:'white',
        },
    },
    navLinkActive: {
        color: 'lightgray',
        '&:hover': {
            color: 'lightgray',
        },
        '& a:hover': {
            color: 'lightgray',
        },
    }
}));

export default function Header() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} color="inherit" component={NavLink} to="/">
                        The Way Home
                    </Typography>
                    <Button className={classes.navLink} activeClassName={classes.navLinkActive} color="inherit" component={NavLink} to="/games">
                        Play 
                    </Button>
                    <Button className={classes.navLink} activeClassName={classes.navLinkActive} color="inherit" component={NavLink} to="/about">
                        Rules 
                    </Button>
                    <Button className={classes.navLink} activeClassName={classes.navLinkActive} color="inherit" component={NavLink} to="/news">
                        News
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};