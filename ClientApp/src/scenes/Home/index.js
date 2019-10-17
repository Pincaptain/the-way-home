import React from 'react';

import {
    Typography,
    Box,
    Link
} from '@material-ui/core';

export default props => (
    <div>
        <Box m={5}>
            <Box mb={2}>
                <Typography variant='h2'>The Way Home!</Typography>
            </Box>
            <Typography>The Way Home is a browser-based game that challenges players on their ability to convincingly lie as well as detect when other players are lying.</Typography>
            <ul>
                <li>
                    <Typography>
                        <Link href='https://get.asp.net/'>ASP.NET Core</Link> and <Link href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</Link> for cross-platform server-side code
                    </Typography>
                </li>
                <li>
                    <Typography>
                        <Link href='https://facebook.github.io/react/'>React</Link> and <Link href='https://redux.js.org/'>Redux</Link> for client-side code
                    </Typography>
                </li>
                <li>
                    <Typography>
                        <Link href='http://getbootstrap.com/'>Bootstrap</Link> for layout and styling
                    </Typography>    
                </li>
            </ul>
            <Typography>To help you get started, we've also set up:</Typography>
            <ul>
                <li>
                    <Typography>
                        <strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.
                    </Typography>
                </li>
                <li>
                    <Typography>
                        <strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.
                    </Typography>
                </li>
                <li>
                    <Typography>
                        <strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.
                    </Typography>
                </li>
            </ul>
            <Typography>The game ranges from 7 to 15 players. These players are randomly divided into alignments - Infiltrator, Hunter, Survivor, Doctor and so on. If you are a plane crash survivor (the good guys) you must track down the Infiltrator and other villains before they kill you. The catch? You don't know who is a plane crash survivor and who is a villain. In the future we plan on implementing other roles with different goals.</Typography>
        </Box>
    </div>
);