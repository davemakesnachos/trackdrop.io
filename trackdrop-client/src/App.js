import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import ReactWavesurfer from 'react-wavesurfer';
import TrackBox from './components/trackbox.js';

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
      playing: false,
      pos: 0,
      tracks: {}
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  componentDidMount() {
    return fetch('http://192.168.33.10/api/v1/tracks', {
      accept: 'application/json',
    }).then((response) => { return response.json(); })
      .then((json) => { this.setState({tracks: json.tracks}) });
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <Navbar navbar navbar-default navbar-fixed-top>
          <Navbar.Header className="navbar-header">
            <Navbar.Brand>
              <a class="navbar-brand" href="/">track<span class = "navbar-brand-accent">drop</span>.io</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        </header>
        <div className="container">
          <p className="App-intro">
            <TrackList tracks={this.state.tracks} />
          </p>
      </div>
      </div>
    );
  }
}

export default App;
