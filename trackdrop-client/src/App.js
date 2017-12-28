import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './node_modules/dropzone/dist/min/dropzone.min.css';
import './node_modules/react-dropzone-component/styles/filepicker.css';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Dropdown,
} from 'semantic-ui-react'
import ReactWavesurfer from 'react-wavesurfer';
import TrackBox from './components/trackbox.js';
import { TrackUploadBox } from './components/track_upload_box.js'

class TrackList extends Component {
  render() {
    let trackList = this.props.tracks;
    const trackListRendered = Object.keys(trackList).map(function(key) {
      console.log(trackList[key]);
      return <TrackBox track={trackList[key]} />;
    });

    return (<span> {trackListRendered} </span>);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: {}
    };
  }

  componentDidMount() {
    return fetch('http://192.168.33.10/api/v1/tracks', {
      accept: 'application/json',
    }).then((response) => { return response.json(); })
      .then((json) => { console.log(json); this.setState({tracks: json.tracks}) });
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
        <Button as='a' inverted>Log in</Button>
        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
        </Menu.Item>
      </Container>
    </Menu>
    <Container style={{ marginTop: '7em' }}>
      <TrackUploadBox />
      <TrackList tracks={this.state.tracks} />
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
