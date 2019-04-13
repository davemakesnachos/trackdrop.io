import React, { Component } from 'react';
import './App.css';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Dropdown
} from 'semantic-ui-react'
import { UserTracks } from './components/user_tracks.js'
import { Login } from './components/login.js'
import { Register } from './components/register.js'
import { Route, Link } from 'react-router-dom';
import { ProtectedRoute } from './components/protected_route.js'
import { connect } from 'react-redux';
import { userService } from './lib/user.js'
import { userActions } from './actions';

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
    <Menu fixed='top' inverted size='large'>
      <Container>
        <Menu.Item as='a' header>
          trackdrop.io
        </Menu.Item>
        <Menu.Item position='right'>
          { (props.userData && (props.userData.logged_in === true))
            ?   <div className="content">
                  <Dropdown item text={props.userData.name}>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={doLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
            :   <div>
                <Link to='/login'>
                <Button inverted>Log in</Button>
                </Link>
                <Link to="/register">
                <Button inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                </Link>
                </div>
          }
        </Menu.Item>
      </Container>
    </Menu>
    <Container style={{ marginTop: '7em' }}>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <ProtectedRoute path='/tracks' component={UserTracks} />
    </Container>
    <Segment
      inverted
      vertical
      style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
    >
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 1' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 2' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 3' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Footer Header' />
              <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider inverted section />
        <Image
          centered
          size='mini'
          src='/logo.png'
        />
        <List horizontal inverted divided link>
          <List.Item as='a' href='#'>Site Map</List.Item>
          <List.Item as='a' href='#'>Contact Us</List.Item>
          <List.Item as='a' href='#'>Terms and Conditions</List.Item>
          <List.Item as='a' href='#'>Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
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
