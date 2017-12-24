import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class App extends Component {
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
