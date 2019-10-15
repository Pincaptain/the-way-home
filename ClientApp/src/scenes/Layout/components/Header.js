import React from 'react';
import { Link } from 'react-router-dom';
import {NavLink} from 'reactstrap';

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
                    <Typography variant="h6" className={classes.title}>
                       <NavLink tag={Link}  className="text-white" to="/"> The Way Home</NavLink> 
                    </Typography>
                    <NavLink tag={Link} className="text-white"  to="/games">
                        <Button color="inherit">Play</Button>
                    </NavLink> 
                    <NavLink tag={Link} className="text-white" to="/about">
                        <Button color="inherit">Rules</Button>
                    </NavLink> 
                    <NavLink tag={Link} className="text-white" to="/news">
                        <Button color="inherit">News</Button>
                    </NavLink> 
                </Toolbar>
            </AppBar>
        </div>
    );
}