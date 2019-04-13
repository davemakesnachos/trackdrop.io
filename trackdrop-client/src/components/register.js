import React, { Component, useState } from 'react';
import {
    Button,
    Grid,
    Header,
    Segment,
    Form,
} from 'semantic-ui-react'
import { userService } from '../lib/user.js'

export function Register(props) {

    const initialState = {
        email: "",
        name: "",
        password: "",
        code: "",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const [state, setState] = useState(initialState)

    const doRegister = () => {
        setIsLoading(true);
        setRegistrationError("");
        userService.register(state)
            .then(function (response) {
                setTimeout(() => {
                    props.history.push('/tracks');
                }, 1000)

            })
            .catch(function (error) {
                setIsLoading(false);
                setRegistrationError(error.response.data.msg);
            });

    }

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <div className="register-form">
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth:'450px'}} >
                    <Form size = "large">
                        <Segment stacked>
                            <Form.Input fluid icon="mail" iconPosition="left" placeholder="Email Address" name="email" value={ state.email } onChange = { handleInputChange } />
                            <Form.Input fluid icon="user" iconPosition="left" placeholder="Name" name="name" value={ state.name } onChange={ handleInputChange } />
                            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" name="password" type='password' value={ state.password } onChange={ handleInputChange } />
                            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Access Code" name="code" value={ state.code } onChange={ handleInputChange } />
                            { (registrationError !== "")
                              ? (<div className="ui negative message">
                                    <div className="header">Please fix the following</div>
                                    <p>{registrationError}</p>
                                </div>)
                              : "" }
                            { isLoading
                              ? <Button size="large" loading>Register</Button>
                              : <Button size="large" onClick={ doRegister }>Register</Button> }
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}
