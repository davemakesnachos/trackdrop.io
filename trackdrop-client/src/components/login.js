import React, { Component, useState } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

import { userService } from '../lib/user.js'
import { connect } from 'react-redux';
import { userActions } from '../actions';


import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

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
            })
            .then(function () {
            });
    }

    const handleInputChange = (e) => {
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
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                    <CustomInput
                        labelText="Email"
                        id="username"
                        name="username"
                        value ={ state.username }
                        onChange = { handleInputChange }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            value: state.username,
                            id: "username",
                            name: "username",
                            onChange: handleInputChange,
                            type: "text",
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
                    </CardBody>
                    { (error !== "")
                      ? (<div className="ui negative message">
                            <div className="header">Please fix the following:</div>
                            <p>{error}</p>
                        </div>)
                      : "" }
                    <CardFooter className={classes.cardFooter}>
                    { isLoading
                              ? <Button simple color="primary" size="lg"><CircularProgress size={14} /></Button>
                              : <Button simple color="primary" size="lg" onClick={doLogin}>Login</Button> }
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

function mapStateToProps(state) {
  const { userData } = state.user;
  return {
      userData
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
const styledLogin = withStyles(loginPageStyle)(connectedLogin);
export { styledLogin as Login };

/*
<div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
*/
