import React, { Component, useState, useEffect } from 'react';
import { userService } from '../lib/user.js'
import queryString from 'query-string'

import Carousel from "react-slick";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import Dialpad from '@material-ui/icons/Dialpad';
// core components
import Footer from "./Footer/Footer.jsx";
import GridContainer from "./Grid/GridContainer.jsx";
import GridItem from "./Grid/GridItem.jsx";
import Button from "./CustomButtons/Button.jsx";
import Card from "./Card/Card.jsx";
import CardBody from "./Card/CardBody.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardFooter from "./Card/CardFooter.jsx";
import CustomInput from "./CustomInput/CustomInput.jsx";
import { withRouter } from 'react-router-dom';

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

export function SuccessFailLoadingButton(props) {

    return (
        <div>
            <br />
                { props.isLoading
                    ? <Button color="primary" size="lg" ><CircularProgress size={14} /></Button>
                    : (props.isSuccess
                        ? <Button onClick={props.successOnClick} color="success" size="lg">Continue</Button> 
                        : <Button color="danger" size="lg">Invalid Code</Button>)
                }
            <br />
        </div>
    )
}
