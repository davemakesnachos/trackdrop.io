import React, { Component, useState, useEffect } from 'react';
import { userService } from '../lib/user.js'
import queryString from 'query-string'

import Carousel from "react-slick";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// core components
// core components
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Footer from "./Footer/Footer.jsx";
import GridContainer from "./Grid/GridContainer.jsx";
import GridItem from "./Grid/GridItem.jsx";
import Button from "./CustomButtons/Button.jsx";
import Card from "./Card/Card.jsx";
import CardBody from "./Card/CardBody.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardFooter from "./Card/CardFooter.jsx";
import CustomInput from "./CustomInput/CustomInput.jsx";
import { withRouter, Link } from 'react-router-dom';

import { SuccessFailLoadingButton } from './successfailloadingbutton.js'

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

function ResetPasswordPage(props) {
    const urlValues = queryString.parse(props.location.search)

    if (urlValues.token == undefined) urlValues.token = "";

    const initialState = {
        password: "",
        token: urlValues.token,
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [passwordVis, setPasswordVis] = useState(false);

    let carousel = null

    useEffect(() =>
      {
        if (isComplete == true) carousel.slickGoTo(2)
        else if (isValid == true) carousel.slickGoTo(1);

        if (isNotValid == true) carousel.slickGoTo(3, true);

      }, [isComplete, isValid, isNotValid]);

    // Initial check for password reset validity
    useEffect(() =>
      {
        userService.checkPasswordResetRequest(state)
            .then(function (response) {
              setIsValid(true);
            })
            .catch(function (error) {
              if (error.response.data.msg == "Invalid Token.") {
                setIsNotValid(true);
              } else {
                setIsFailed(true);
              }
            });
      }, []);

    const [state, setState] = useState(initialState)

    const doResetPasswordRequest = () => {
        setIsFailed(false);
        setIsLoading(true);

        userService.resetPassword(state)
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

    const handleClickShowPassword = () => {
      setPasswordVis(!passwordVis);
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

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
                      <CircularProgress />
                    </GridItem>
                  </GridContainer>
                </div>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>Reset your password</h2>
                      <h3>
                        Enter your new password below.
                      </h3>
                      <br />
                      <OutlinedInput
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        label="New Password"
                        variant="outlined"
                        value={state.password}
                        type={passwordVis ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {passwordVis ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <br /><br />
                      { isLoading
                        ? <Button color="primary" size="lg" ><CircularProgress size={14} /></Button>
                        : <Button color="primary" size="lg" onClick={ doResetPasswordRequest }>Submit</Button> }
                    </GridItem>
                    { isFailed
                        ? <GridItem xs={12} sm={12} md={8} className={classes.codeForm}><br /><br />Error submitting request. Please try again later.</GridItem>
                        : <div></div> }
                  </GridContainer>
                </div>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>Password Successfully Reset!</h2>
                      <h4>Your password has been changed. Please <Link to='/login' >click here</Link> to login using your new password.</h4>
                    </GridItem>
                  </GridContainer>
                </div>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>Invalid Request</h2>
                      <h4>The link you have followed is either expired or is not valid. If you still need to reset your password, please send another request from the <Link to='/forgot_password' >forgot password</Link> page.</h4>
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

const styledResetPasswordPage = withRouter(withStyles(loginPageStyle)(ResetPasswordPage));
export { styledResetPasswordPage as ResetPasswordPage };
