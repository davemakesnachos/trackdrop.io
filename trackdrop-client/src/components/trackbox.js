import React, { Component } from 'react';
import '../App.css';
import {
    Card,
    Image,
    Icon,
    Grid,
    Button,
  } from 'semantic-ui-react'
import { DeleteButton } from './trackbox_delete_modal.js';
import Waveform from './waveform.js';

class TrackBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      loaded: false,
      audioFile: ''
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleTogglePlay() {
    if (!this.state.loaded) {
        this.setState({
            audioFile: this.props.track.streamUrl,
            loaded: true,
            playing: true
        })
    } else {
      this.setState({
        playing: !this.state.playing,
      });
    }
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  confirmDelete() {
    let removeTrack = this.props.removetrack;
    fetch('/api/v1/track/delete/' + this.props.track.id, {
        accept: 'application/json',
      }).then(() => {
        removeTrack(this.props.track.id);
    })
  }
  render() {
    return (
        <Card fluid>
        <Card.Content>
          <Card.Header>
                <Image src="profile-blank.png" size='mini' circular spaced='right'/>
                {this.props.track.name}
          </Card.Header>
        </Card.Content>
        <Card.Content>
        <Grid >
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle' textAlign='center'>
            {
                this.state.playing
                ? <Icon link name='pause' size='huge' onClick={this.handleTogglePlay}/>
                : <Icon link name='play' size='huge' onClick={this.handleTogglePlay}/>
            }
            </Grid.Column>
            <Grid.Column width={14}>
              <Waveform src={this.state.audioFile} audioPeaks={this.props.track.wave_data.data} playing={this.state.playing}></Waveform>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            <DeleteButton show={this.state.deleteShow} track={this.props.track} confirmdelete={this.confirmDelete}/>
            <Button color='green' size="mini" href={this.props.track.downloadUrl} floated='right'>Download</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default TrackBox;
