import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import { getGames } from '../../../store/actions/Games';
import GameCard from './GameCard';

class GamesGrid extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        const spacing = 4;

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>
                            {this.props.games.map(game =>
                                <Grid key={game.id} item>
                                    <GameCard game={game} />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    games: state.games.games
});

export default connect(mapStateToProps, { getGames })(GamesGrid);