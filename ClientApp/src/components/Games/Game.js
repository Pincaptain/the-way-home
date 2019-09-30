import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from "reactstrap";
import * as signalR from "@aspnet/signalr";

import { getGame } from '../../store/actions/Games';
import { identity } from '../../extensions/Identity';

class Game extends Component {
    static propTypes = {
        game: PropTypes.object.isRequired,
        getGame: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            playerAlert: false,
            playerAlertText: '',
        };

        this.signalRConnection = null;
        this.identity = null;
        this.gameId = null;

        this.setupIdentity = this.setupIdentity.bind(this);
        this.setupSignalR = this.setupSignalR.bind(this);

        this.dismissPlayerAlert = this.dismissPlayerAlert.bind(this);

        this.destroySignalR = this.destroySignalR.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.gameId = id;

        this.props.getGame(this.gameId);

        this.setupIdentity();
        this.setupSignalR();
    }

    componentWillUnmount() {
        this.destroySignalR();
    }

    setupIdentity() {
        this.identity = identity();
    }

    setupSignalR() {
        this.signalRConnection = new signalR.HubConnectionBuilder()
            .withUrl('/hubs/GamesHub')
            .build();

        this.signalRConnection.on("PLAYER_JOINED", (userName) => {
            this.setState({
                playerAlertText: `A new challenger approaches! Please welcome, ${userName}!`,
                playerAlert: true
            });
        });

        this.signalRConnection.start().then(() => {
            this.signalRConnection.invoke("JoinGame", this.identity, this.gameId);
        });
    }

    dismissPlayerAlert() {
        this.setState({ playerAlert: false });
    }

    destroySignalR() {
        console.log(this.identity + ' ' + this.gameId);
        this.signalRConnection.invoke("LeaveGame", this.identity, this.gameId).then(() => {
            this.signalRConnection.stop();
        });
    }

    render() {
        return (
            <div>
                <Alert color="info" isOpen={this.state.playerAlert} toggle={this.dismissPlayerAlert}>
                    {this.state.playerAlertText}
                </Alert>
                <div>
                    {this.props.game != null ? <p>{`${this.props.game.id}: ${this.props.game.name}`}</p> : <p>Loading</p>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    game: state.games.game
});

export default connect(mapStateToProps, { getGame })(Game)