import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGame } from '../store/actions/Games';

class Game extends Component {
    static propTypes = {
        game: PropTypes.object.isRequired,
        getGame: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.getGame(id);
    }

    render() {
        return (
            <div>
                {renderGame(this.props)}
            </div>
        );
    }
}

function renderGame(props) {
    return (
        <div>
            {props.game != null ? <p>{`${props.game.id}: ${props.game.name}`}</p> : <p>Loading</p>}
        </div>
    );
}

const mapStateToProps = state => ({
    game: state.games.game
});

export default connect(mapStateToProps, { getGame })(Game)