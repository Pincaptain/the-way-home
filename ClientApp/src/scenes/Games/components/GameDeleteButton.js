import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import { deleteGame } from '../../../store/actions/Games';

class GameDeleteButton extends Component {
    static propTypes = {
        deleteGame: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <Button size='small' onClick={() => this.props.deleteGame(this.props.game.id)}>
                    Delete
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteGame })(GameDeleteButton);