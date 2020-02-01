import React, { Component, useState } from 'react';
import { userService } from '../lib/user.js'

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

function Register(props) {

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
        console.log('going')
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
        console.log('oi');
        console.log('%o', e)
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const { classes, ...rest } = props;
    return (
      <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Create Account</h4>
                    </CardHeader>
                    <CardBody>
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Person className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    <CustomInput
                        labelText="Email..."
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
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
                            type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    <CustomInput
                        labelText="Access Code"
                        id="code"
                        name="code"
                        value={ state.code } onChange = { handleInputChange }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: state.code,
                          id: "code",
                          name: "code",
                          onChange: handleInputChange,
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Dialpad className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    { (registrationError !== "")
                              ? (<div className="ui negative message">
                                    <div className="header">Please fix the following</div>
                                    <p>{registrationError}</p>
                                </div>)
                              : "" }

                    <CardFooter className={classes.cardFooter}>
                      { isLoading
                        ? <Button simple color="primary" size="lg" ><CircularProgress size={14} /></Button>
                        : <Button simple color="primary" size="lg" onClick={ doRegister }>Register</Button> }
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer />
        </div>
    );
}

const styledRegister = withRouter(withStyles(loginPageStyle)(Register));
export { styledRegister as Register };
