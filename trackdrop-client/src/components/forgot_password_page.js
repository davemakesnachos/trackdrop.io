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
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

import { SuccessFailLoadingButton } from './successfailloadingbutton.js'

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

function ForgotPasswordPage(props) {
    const initialState = {
        email: "",
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    let carousel = null

    useEffect(() =>
      {
        if (isComplete == true) carousel.slickGoTo(1);
      }, [isComplete]);

    const [state, setState] = useState(initialState)

    const doForgotPasswordRequest = () => {
        setIsFailed(false);
        setIsLoading(true);

        userService.forgotPassword(state)
            .then(function (response) {
                setTimeout(() => {
                  setIsComplete(true);
                  setIsLoading(false);
                }, 200)

            })
            .catch(function (error) {
              setIsFailed(true);
              setIsLoading(false);
            });

    }

    const handleInputChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
    }

    const { classes, ...rest } = props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      adaptiveHeight: true,
      arrows: false,
      touchMove: false
    };

    return (
      <div>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={classes.marginAuto} justify="center">
              <Carousel ref={c => carousel = c} centered {...settings}>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>Forgot your password?</h2>
                      <h3>
                        Enter the email you used to register below to receive a new password.
                      </h3>
                      <br />
                      <TextField
                        id="email"
                        name="email"
                        value={state.email}
                        onChange={handleInputChange}
                        label="Email Address"
                        variant="outlined"
                      />
                      <br /><br />
                      { isLoading
                        ? <Button color="primary" size="lg" ><CircularProgress size={14} /></Button>
                        : <Button color="primary" size="lg" onClick={ doForgotPasswordRequest }>Submit</Button> }
                    </GridItem>
                    { isFailed
                        ? <GridItem xs={12} sm={12} md={8} className={classes.codeForm}><br /><br />Error submitting request. Please try again later.</GridItem>
                        : <div></div> }
                  </GridContainer>
                </div>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>Request Received!</h2>
                      <h4>An email will be sent shortly with instructions on how to reset your password.</h4>
                    </GridItem>
                  </GridContainer>
                </div>
              </Carousel>
            </GridItem>
          </GridContainer>
          </div>
          <Footer className={classes.footer}/>
        </div>
    );
}

const styledForgotPasswordPage = withRouter(withStyles(loginPageStyle)(ForgotPasswordPage));
export { styledForgotPasswordPage as ForgotPasswordPage };
