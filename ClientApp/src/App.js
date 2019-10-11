import React from 'react';
import { Route } from 'react-router';

import Layout from './components/Layout/Layout';
import Home from './components/Default/Home';
import Games from './components/Games/Games';
import Game from './components/Games/Game';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/games' component={Games} />
        <Route exact path='/games/:id' component={Game} />
    </Layout>
);
