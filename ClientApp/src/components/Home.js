import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>The Way Home!</h1>
        <p>The Way Home is a browser-based game that challenges players on their ability to convincingly lie as well as detect when other players are lying.</p>
    <ul>
      <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
      <li><a href='https://facebook.github.io/react/'>React</a> and <a href='https://redux.js.org/'>Redux</a> for client-side code</li>
      <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
    </ul>
    <p>To help you get started, we've also set up:</p>
    <ul>
      <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
      <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
      <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
    </ul>
    <p>The game ranges from 7 to 15 players. These players are randomly divided into alignments - Infiltrator, Hunter, Survivor, Doctor and so on. If you are a plane crash survivor (the good guys) you must track down the Infiltrator and other villains before they kill you. The catch? You don't know who is a plane crash survivor and who is a villain. In the future we plan on implementing other roles with different goals.</p>
  </div>
);

export default connect()(Home);
