import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
// core components
import Header from "./Header/Header.jsx";
import CustomDropdown from "./CustomDropdown/CustomDropdown.jsx";
import Button from "./CustomButtons/Button.jsx";

import navbarsStyle from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

import image from "../assets/img/bg.jpg";
import profileImage from "../assets/img/faces/avatar.jpg";

import { userService } from '../lib/user.js'
import { userActions } from '../actions';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function TrackdropHeader(props) {

    const { classes } = props;
    let history = props.history;

    let doLogout = () => {
        userService.logout()
            .then(function (response) {
                localStorage.removeItem('user');
                props.dispatch(userActions.logout());
                props.history.push('/');
            })
            .catch(function (error) {
                localStorage.removeItem('user');
                props.dispatch(userActions.logout());
                props.history.push('/');
            })
            .then(function () {
            });
    }

    const handleDropdownClick = (param) => {
        switch (param.props.to) {
            case '/logout':
                doLogout();
                break;
        }
    }

    console.log("%o", props);
    console.log(props.location.pathname)

    return (
        <div>
        <Header
        brand="trackdrop.io"
        color={(props.location.pathname == '/') ? "transparent" : "white"}
        fixed
        changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
        rightLinks={(props.userData && (props.userData.logged_in === true))
            ? <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                    href="/tracks"
                    className={classes.navLink}
                    color="transparent"
                    >
                        Stream
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                    right
                    onClick={handleDropdownClick}
                    hoverColor="info"
                    buttonIcon={AccountCircle}
                    buttonText={props.userData.name}
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    dropdownList={ [
                        <Link to='/logout' onClick={e => e.preventDefault()} >Sign out</Link>
                    ] }
                    />
                </ListItem>
            </List>
            : <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                  color="danger"
                  size="sm"
                  href="/register"
                  className={classes.navLink}
                >
                    Register
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                href="/login"
                className={classes.navLink}
                color="transparent"
                >
                    Login
                </Button>
            </ListItem>
        </List>
        }
        />
        </div>
    );
}

function mapStateToProps(state) {
    console.log(state);
    const userData = state.user;
    return {
        userData
    };
}

const styledTrackdropHeader = withRouter(withStyles(navbarsStyle)(TrackdropHeader))
const styledConnectedTrackdropHeader = connect(mapStateToProps)(styledTrackdropHeader);
export { styledConnectedTrackdropHeader as Header };
