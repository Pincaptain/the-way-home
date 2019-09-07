import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getGames } from '../store/actions/Games';

class Games extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        getGames: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        return (
            <div>
                {renderGamesTable(this.props)}
                {renderCreateGame(this.props)}
            </div>
        );
    }
}

function renderGamesTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Identification</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.games.map(game =>
                    <tr key={game.id}>
                        <td>{game.id}</td>
                        <td>{game.name}</td>
                        <td>
                            <Link to={'/games/' + game.id}>Join</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function renderCreateGame() {
    return (
        <div>
            <button type="button" className="btn btn-link" data-toggle="modal" data-target="#createGameModal">
                Create a game
            </button>

            <div className="modal" id="createGameModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modal Heading</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            Modal body..
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    games: state.games.games
});

export default connect(mapStateToProps, { getGames })(Games)