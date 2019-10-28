import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGames } from '../../../../store/actions/Games';
import GamesGrid from '../Sets/GamesGrid';
import GamesProgress from '../Progresses/GamesProgress';

class GamesLoader extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        gamesLoading: PropTypes.bool.isRequired
    };

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        return (
            <div>
                {
                    this.props.gamesLoading ?
                        <GamesProgress /> :
                        <GamesGrid games={this.props.games} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    games: state.games.games,
    gamesLoading: state.games.gamesLoading
});

export default connect(mapStateToProps, { getGames })(GamesLoader);