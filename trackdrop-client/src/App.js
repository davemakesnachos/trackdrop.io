import React, { Component } from 'react';
import './App.css';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';
import { UserTracks } from './components/user_tracks.js'
import { Login } from './components/login.js'
import { Register } from './components/register.js'
import { Route, Link } from 'react-router-dom';
import { ProtectedRoute } from './components/protected_route.js'
import { connect } from 'react-redux';
import { userService } from './lib/user.js'
import { userActions } from './actions';
import { Header } from './components/header.js';
import Grid from '@material-ui/core/Grid';

function App(props) {

    const doLogout = () => {
        userService.logout()
        .then(function (response) {
            localStorage.removeItem('user');
            props.dispatch(userActions.logout());
        })
        .catch(function (error) {
            localStorage.removeItem('user');
            props.dispatch(userActions.logout());
        })
        .then(function () {
        });
    }

    return (
        <div>
                <Header />
                <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <ProtectedRoute path='/tracks' component={UserTracks} />
            </Grid>
        </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userData: state.user
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
