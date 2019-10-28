import React from 'react';

import {
    Box,
    LinearProgress
} from '@material-ui/core';

export default function GamesProgress() {
    return (
        <div>
            <Box m={5}>
                <LinearProgress />
            </Box>
        </div>
    );
};