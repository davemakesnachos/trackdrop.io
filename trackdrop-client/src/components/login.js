import React, { Component, useState } from 'react';
import {
    Button,
    Grid,
    Header,
    Segment,
    Form,
} from 'semantic-ui-react'
import { userService } from '../lib/user.js'

export function Login(props) {

    const initialState = {
        username: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [state, setState] = useState(initialState)

    const doLogin = () => {
        setIsLoading(true);
        setError("");
        userService.login(state)
            .then(function (response) {
                setTimeout(() => {
                    props.history.push('/tracks');
                }, 1000)

            })
            .catch(function (error) {
                setIsLoading(false);
                console.log(error.response)
                setError(error.response.data.msg);
            });

    }

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <div className="login-form">
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth:'450px'}} >
                    <Form size = "large">
                        <Segment stacked>
                            <Form.Input fluid icon="user" iconPosition="left" placeholder="Email or Profile Name" name="username" value={state.username} onChange={handleInputChange} />
                            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type='password' name="password" value={state.password} onChange={handleInputChange} />
                            { (error !== "")
                              ? (<div className="ui negative message">
                                    <div className="header">Please fix the following</div>
                                    <p>{error}</p>
                                </div>)
                              : "" }
                            { isLoading
                              ? <Button size="large" loading>Login</Button>
                              : <Button size="large" onClick={ doLogin }>Login</Button> }
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}
