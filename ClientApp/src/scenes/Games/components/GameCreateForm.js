import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    FormGroup,
    DialogActions,
    Button
} from '@material-ui/core';

import { isEmpty } from '../../../extensions/Empty';
import { createGame } from '../../../store/actions/Games';

class GameCreateForm extends Component {
    static propTypes = {
        createGame: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={values => this.props.createGame(values)}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('Nameless games will not be tolerated!')
                    })}>
                    {props => {
                        const {
                            values,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormGroup>
                                        <InputLabel htmlFor='name' error={errors.name}>Name</InputLabel>
                                        <Input id='name' type='text' value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
                                        <FormHelperText error={errors.name} hidden={!errors.name}>{errors.name}</FormHelperText>
                                    </FormGroup>
                                </FormControl>
                                <DialogActions>
                                    <Button color='primary' onClick={handleReset} disabled={!dirty || isSubmitting}>
                                        Reset
                                    </Button>
                                    <Button color='primary' type='submit' disabled={!isEmpty(errors) || isSubmitting}>
                                        Create
                                    </Button>
                                </DialogActions>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { createGame })(GameCreateForm);