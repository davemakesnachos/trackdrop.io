import React, { Component, useState } from 'react';
import {
    Button,
    Grid,
    Header,
    Segment,
    Form,
} from 'semantic-ui-react'
import { userService } from '../lib/user.js'
import { connect } from 'react-redux';
import { userActions } from '../actions';


function Login(props) {

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
                const user_data = {
                    name: response.data.name,
                    token: response.data.token,
                   };
                localStorage.setItem('user', JSON.stringify(user_data));
                props.dispatch(userActions.login(user_data));
                setTimeout(() => {
                    props.history.push('/tracks');
                }, 1000)
            })
            .catch(function (error) {
                setIsLoading(false);
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

function mapStateToProps(state) {
    const { userData } = state.user;
    return {
        userData
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
