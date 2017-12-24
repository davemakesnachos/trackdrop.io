import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import ReactWavesurfer from 'react-wavesurfer';
import TrackBox from './components/trackbox.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
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
            <TrackBox />
          </p>
      </div>
      </div>
    );
  }
}

export default App;
