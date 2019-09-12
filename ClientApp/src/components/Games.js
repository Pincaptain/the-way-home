import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, Label, FormGroup, FormText, FormFeedback, Table } from 'reactstrap';

import { getGames, createGame, updateGame, deleteGame } from '../store/actions/Games';

class Games extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        getGames: PropTypes.func.isRequired,
        createGame: PropTypes.func.isRequired,
        updateGame: PropTypes.func.isRequired,
        deleteGame: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            gameModal: false,
            editGameModal: false,
            gameForm: {
                name: ''
            },
            editGameForm: {
                id: null,
                name: ''
            },
            gameFormErrors: {
                name: null
            },
            editGameFormErrors: {
                name: null
            }
        };

        this.toggleGameModal = this.toggleGameModal.bind(this);
        this.toggleEditGameModal = this.toggleEditGameModal.bind(this);

        this.gameFormChange = this.gameFormChange.bind(this);
        this.editGameFormChange = this.editGameFormChange.bind(this);

        this.gameFormSubmit = this.gameFormSubmit.bind(this);
        this.editGameFormSubmit = this.editGameFormSubmit.bind(this);

        this.validateGameForm = this.validateGameForm.bind(this);
        this.validateEditGameForm = this.validateEditGameForm.bind(this);
    }

    toggleGameModal() {
        this.setState(previousState => ({
            gameModal: !previousState.gameModal
        }));
    }

    toggleEditGameModal(game) {
        if (game !== null) {
            this.setState(previousState => ({
                editGameForm: {
                    ...previousState.editGameForm,
                    name: game.name,
                    id: game.id
                }
            }));
        }
        else {
            this.setState(previousState => ({
                editGameFormErrors: {
                    ...previousState.editGameFormErrors,
                    name: null
                }
            }));
        }

        this.setState(previousState => ({
            editGameModal: !previousState.editGameModal
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

    validateEditGameForm(field = null, value = null) {
        let editGameFormErrors = this.state.editGameFormErrors;

        if (field != null && value != null) {
            switch (field) {
                case 'name':
                    if (this.state.editGameForm[field] === '') {
                        editGameFormErrors[field] = 'Nameless games will not be tolerated';
                    }
                    else {
                        editGameFormErrors[field] = '';
                    }
                    break;
                default:
                    break;
            }

            return editGameFormErrors;
        }

        let valid = true;

        if (this.state.editGameFormErrors.name !== '') {
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

    editGameFormChange(event) {
        event.persist();

        let editGameForm = this.state.editGameForm;
        editGameForm[event.target.name] = event.target.value;
        let editGameFormErrors = this.validateEditGameForm(event.target.name, event.target.value);

        this.setState({
            editGameForm: editGameForm,
            editGameFormErrors: editGameFormErrors
        });
    }

    editGameFormSubmit(event) {
        event.preventDefault();

        if (this.validateEditGameForm()) {
            this.props.updateGame(this.state.editGameForm);
            this.toggleEditGameModal(null);
        }
    }

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        return (
            <div className='table-responsive'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Identification</th>
                            <th>Name</th>
                            <th></th>
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
                                <td>
                                    <Button color='link' onClick={(event) => this.toggleEditGameModal(game)}>Edit</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
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
                    <Modal isOpen={this.state.editGameModal} toggle={this.toggleEditGameModal} className={this.props.className}>
                        <ModalHeader toggle={this.toggleEditGameModal}>Create a game</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for='name'>Name</Label>
                                    {
                                        this.state.editGameFormErrors.name === null ?
                                            <Input name='name' type='text' value={this.state.editGameForm.name} onChange={this.editGameFormChange} /> :
                                            this.state.editGameFormErrors.name === '' ?
                                                <Input valid name='name' type='text' value={this.state.editGameForm.name} onChange={this.editGameFormChange} /> :
                                                <Input invalid name='name' type='text' value={this.state.editGameForm.name} onChange={this.editGameFormChange} />
                                    }
                                    <FormText>Enter the name of your game room</FormText>
                                    <FormFeedback>{this.state.editGameFormErrors.name}</FormFeedback>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            {
                                this.validateEditGameForm() ?
                                    <Button color='secondary' type='submit' onClick={(event) => this.editGameFormSubmit(event)}>Update</Button> :
                                    <Button color='secondary' disabled outline>Update</Button>
                            }
                            <Button color='default' onClick={this.toggleEditGameModal}>Cancel</Button>
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

export default connect(mapStateToProps, { getGames, createGame, updateGame, deleteGame })(Games)