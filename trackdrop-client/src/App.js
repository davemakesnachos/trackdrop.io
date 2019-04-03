import React, { Component } from 'react';
import './App.css';
import './node_modules/dropzone/dist/min/dropzone.min.css';
import './node_modules/react-dropzone-component/styles/filepicker.css';
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
} from 'semantic-ui-react'
import { UserTracks } from './components/user_tracks.js'
import { Login } from './components/login.js'
import { Register } from './components/register.js'
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
    <Menu fixed='top' inverted size='large'>
      <Container>
        <Menu.Item as='a' header>
          trackdrop.io
        </Menu.Item>
        <Menu.Item position='right'>
        <Link to='/login'>
        <Button as='a' inverted>Log in</Button>
        </Link>
        <Link to="/register">
        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
        </Link>
        </Menu.Item>
      </Container>
    </Menu>
    <Container style={{ marginTop: '7em' }}>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/tracks' component={UserTracks} />
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
}

export default App;
