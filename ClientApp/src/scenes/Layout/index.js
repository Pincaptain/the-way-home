import React from 'react';

import { Container } from '@material-ui/core';

import Header from './components/Header';
import Footer from './components/Footer';

export default props => (
    <div>
        <Header />
        <Container>
            {props.children}
        </Container>
        <Footer />
    </div>
);
