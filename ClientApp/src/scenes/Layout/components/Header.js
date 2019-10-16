import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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
    button:{
        color:'white',
        '&:hover':{
            color:'white',
        },
        '& a:hover':{
            color:'white',
        },
    },
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
                    <Typography variant="h6" className={classes.title} color="inherit" component={Link} to="/" exact >
                            The Way Home
                    </Typography>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/games" exact >Play </Button>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/about" exact >Rules</Button>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/news" exact  >News</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}