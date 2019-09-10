import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, Label, FormGroup, FormText, FormFeedback } from 'reactstrap';

import { getGames, createGame, deleteGame } from '../store/actions/Games';

class Games extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        getGames: PropTypes.func.isRequired,
        createGame: PropTypes.func.isRequired,
        deleteGame: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            gameModal: false,
            gameForm: {
                name: ''
            },
            gameFormErrors: {
                name: null
            }
        };

        this.toggleGameModal = this.toggleGameModal.bind(this);
        this.gameFormChange = this.gameFormChange.bind(this);
        this.gameFormSubmit = this.gameFormSubmit.bind(this);
        this.validateGameForm = this.validateGameForm.bind(this);
    }

    toggleGameModal() {
        this.setState(previousState => ({
            gameModal: !previousState.gameModal
        }));
    }

    validateGameForm(field = null, value = null) {
        let gameFormErrors = this.state.gameFormErrors;

        if (field != null && value != null) {
            switch (field) {
                case 'name':
                    if (this.state.gameForm[field] === '') {
                        gameFormErrors[field] = 'Nameless games will not be tolerated';
                    }
                    else {
                        gameFormErrors[field] = '';
                    }
                    break;
                default:
                    break;
            }

            return gameFormErrors;
        }

        let valid = true;

        if (this.state.gameFormErrors.name !== '') {
            valid = false;
        }

        return valid;
    }

    gameFormChange(event) {
        event.persist();

        let gameForm = this.state.gameForm;
        gameForm[event.target.name] = event.target.value;
        let gameFormErrors = this.validateGameForm(event.target.name, event.target.value);

        this.setState({
            gameForm: gameForm,
            gameFormErrors: gameFormErrors
        });
    }

    gameFormSubmit(event) {
        event.preventDefault();

        if (this.validateGameForm()) {
            this.props.createGame(this.state.gameForm);
        }
    }

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Identification</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.games.map(game =>
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>
                                    <Button color='link'><Link to={'/games/' + game.id}>Join</Link></Button>
                                </td>
                                <td>
                                    <Button color='link' onClick={(event) => this.props.deleteGame(game.id)}>Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    <Button color='link' onClick={this.toggleGameModal}>Create a game</Button>
                    <Modal isOpen={this.state.gameModal} toggle={this.toggleGameModal} className={this.props.className}>
                        <ModalHeader toggle={this.toggleGameModal}>Create a game</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for='name'>Name</Label>
                                    {
                                        this.state.gameFormErrors.name === null ?
                                            <Input name='name' type='text' value={this.state.gameForm.name} onChange={this.gameFormChange} /> :
                                            this.state.gameFormErrors.name === '' ?
                                                <Input valid name='name' type='text' value={this.state.gameForm.name} onChange={this.gameFormChange} /> :
                                                <Input invalid name='name' type='text' value={this.state.gameForm.name} onChange={this.gameFormChange} />
                                    }
                                    <FormText>Enter the name of your game room</FormText>
                                    <FormFeedback>{this.state.gameFormErrors.name}</FormFeedback>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            {
                                this.validateGameForm() ?
                                    <Button color='secondary' type='submit' onClick={(event) => this.gameFormSubmit(event)}>Create</Button> :
                                    <Button color='secondary' disabled outline>Create</Button>
                            }
                            <Button color='default' onClick={this.toggleGameModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    games: state.games.games
});

export default connect(mapStateToProps, { getGames, createGame, deleteGame })(Games)