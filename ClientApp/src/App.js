import React from 'react';
import { Route } from 'react-router';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Layout from './scenes/Layout';
import Home from './components/Default/Home';
import Games from './components/Games/Games';
import Game from './components/Games/Game';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#78909c',
            main: '#607d8b',
            dark: '#455a64',
            contrastText: '#fff',
        },
        secondary: {
            light: '#8d6e63',
            main: '#795548',
            dark: '#5d4037',
            contrastText: '#000',
        },
    },
});

export default () => (
    <MuiThemeProvider theme={theme}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/games' component={Games} />
            <Route exact path='/games/:id' component={Game} />
        </Layout>
    </MuiThemeProvider>
);
