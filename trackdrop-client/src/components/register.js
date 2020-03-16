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
import TextField from '@material-ui/core/TextField';
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

import { SuccessFailLoadingButton } from './successfailloadingbutton.js'

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

function Register(props) {
    const urlValues = queryString.parse(props.location.search)

    if (urlValues.code == undefined) urlValues.code = "";

    const initialState = {
        email: "",
        name: "",
        password: "",
        code: urlValues.code,
    };

    let carousel = null
    let codeInput = null

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const [passwordVis, setPasswordVis] = useState(false);
    const [state, setState] = useState(initialState)

    useEffect(() =>
      {
        if (state.code == "") return;

        let codeObject = {
          code: state.code
        }
        setIsLoading(true)
        userService.checkCode(codeObject)
            .then(function (response) {
                if (response.data.status == 200) setIsSuccess(true)
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsSuccess(false)
                setIsLoading(false);
            })
            .then(function () {
            });


      }, [state.code]);

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

    const handleCodeInputChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
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
            <GridItem xs={12} sm={12} md={12} className={classes.marginAuto} justify="center">
              <Carousel ref={c => carousel = c} centered {...settings}>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12} className={classes.codeForm}>
                      <h2>Trackdrop is currently in closed beta.</h2>
                      <h3>
                        If you have an invite code, enter it here to continue.
                      </h3>
                      <br /><br />
                      <TextField
                        id="code"
                        name="code"
                        value={state.code}
                        onChange={handleCodeInputChange}
                        label="Invite Code"
                        variant="outlined"
                      />
                      <br /><br />
                      <SuccessFailLoadingButton
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        successOnClick={e => carousel.slickGoTo(1)}/>
                    </GridItem>
                  </GridContainer>
                </div>
                <div>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.codeForm}>
                      <h2>You're in!</h2>
                      <h4>Please enter the info below to get started.</h4>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        name="email"
                        value={ state.email } onChange = { handleInputChange }
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange= {handleInputChange}
                        inputProps={{
                            value: state.email,
                            id: "email",
                            name: "email",
                            onChange: handleInputChange,
                            type: "text",
                        }}
                      />
                      <CustomInput
                        labelText="Profile Name"
                        id="name"
                        name="name"

                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: state.name,
                          id: "name",
                          name: "name",
                          onChange: handleInputChange,
                          type: "text",
                        }}
                      />
                      <CustomInput
                        labelText="Profile Name"
                        id="name"
                        name="name"

                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: state.name,
                          id: "name",
                          name: "name",
                          onChange: handleInputChange,
                          type: "text",
                          startAdornment: (<InputAdornment position="start">https://trackdrop.io</InputAdornment>)
                        }}
                      />
                    <CustomInput
                        labelText="Password"
                        id="password"
                        name="password"
                        value ={ state.password }
                        onChange = { handleInputChange }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            value: state.password,
                            id: "password",
                            name: "password",
                            onChange: handleInputChange,
                            type: (passwordVis ? 'text' : 'password'),
                            endAdornment: (
                              <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle Password Visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {passwordVis ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                            )
                        }}
                      />
                      <br />
                      { isLoading
                        ? <Button color="primary" size="lg" ><CircularProgress size={14} /></Button>
                        : <Button color="primary" size="lg" onClick={ doRegister }>Register</Button> }
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

const styledRegister = withRouter(withStyles(loginPageStyle)(Register));
export { styledRegister as Register };
