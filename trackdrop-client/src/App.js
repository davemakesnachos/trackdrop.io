import React, { Component } from 'react';
import './App.css';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';
import { Landing } from './components/landing.js';
import { ForgotPasswordPage } from './components/forgot_password_page.js';
import { ResetPasswordPage } from './components/reset_password_page.js';
import { UserTracks } from './components/user_tracks.js'
import { Profile } from './components/profile.js'
import { UserTrack } from './components/user_track.js'
import { Login } from './components/login.js'
import { Register } from './components/register.js'
import { Route, withRouter, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/protected_route.js'
import { connect } from 'react-redux';
import { userService } from './lib/user.js'
import { userActions } from './actions';
import { Header } from './components/header.js';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import "./assets/scss/material-kit-react.scss?v=1.4.0";

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  navbar_spacer: theme.mixins.toolbar,
});

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

    const classes = props.classes;

    return (
        <div>
                <Header />
                {
                    (props.location.pathname == '/')
                    ? <div />
                    : <div className={classes.navbar_spacer} ></div>
                }
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/reset_password' component={ResetPasswordPage} />
                    <Route path='/forgot_password' component={ForgotPasswordPage} />
                    <Route path='/register' component={Register} />
                    <Route path='/track/:profile/:track' component={UserTrack} />
                    <Route path='/tracks/:profile' component={Profile} />
                    <ProtectedRoute path='/tracks' component={UserTracks} />
                    <Route exact path='/' component={Landing} />
                </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userData: state.user
    };
}

const connectedApp = withRouter(withStyles(styles)(connect(mapStateToProps)(App)));
export { connectedApp as App };
