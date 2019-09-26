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
            playerAlert: false
        };

        this.signalRConnection = null;
        this.identity = null;

        this.setupIdentity = this.setupIdentity.bind(this);
        this.setupSignalR = this.setupSignalR.bind(this);

        this.dismissPlayerAlert = this.dismissPlayerAlert.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.getGame(id);

        this.setupIdentity();
        this.setupSignalR();

        this.signalRConnection.start();
    }

    componentWillUnmount() {
        this.signalRConnection.stop();
    }

    setupIdentity() {
        this.identity = identity();
    }

    setupSignalR() {
        this.signalRConnection = new signalR.HubConnectionBuilder()
            .withUrl('/hubs/GamesHub')
            .build();

        this.signalRConnection.on("PLAYER_JOINED", (user) => {
            this.setState({ playerAlert: true });
        });
    }

    dismissPlayerAlert() {
        this.setState({ playerAlert: false });
    }

    render() {
        return (
            <div>
                <Alert color="info" isOpen={this.state.playerAlert} toggle={this.dismissPlayerAlert}>
                    Another one bites the dust!
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