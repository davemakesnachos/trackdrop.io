import React, { Component } from 'react';
import '../App.css';
import { Image, Panel, Button, Grid, Row, Col } from 'react-bootstrap';
import { DeleteModal } from './trackbox_delete_modal.js';
import ReactWavesurfer from 'react-wavesurfer';

class TrackBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
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

  confirmDelete() {
    fetch('http://192.168.33.10/api/v1/track/delete/' + this.props.track.id, {
        accept: 'application/json',
      });
  }
  render() {
    let hideDelete = () => this.setState({ deleteShow: false });
    const panelHeaderACtual = (
        <div className = "row trackbox-header">
            <div className="col-sm-5">
                {this.props.track.name}
            </div>
            <div className = "col-sm-4">
                <button className="btn btn-primary btn-xs" onClick={this.handleTogglePlay}>
                    <i className="fa fa-play"></i>
                    Play /
                    <i className="fa fa-pause"></i>
                    Pause
                </button>
                <a className="btn btn-success btn-xs" href={this.props.track.downloadUrl}>
                    <i className="fa fa-download"></i>
                    Download
                </a>
            </div>
            <div className="col-sm-3">
                <div className="delete-button" id = "delete-div-<?php echo $sub_meta_info['track_id'] ?>">
                    <button className="btn btn-xs btn-danger pull-right" onClick={() => this.setState({ deleteShow: true })}>
                    <i className="fa fa-trash"></i>
                    Delete
                    </button>
                </div>
            </div>
        </div>
    );

    const panelHeader = (
            <Grid className= "track-header">
            <Row className= "track-header">
            <Col xs={1} md={1} className= "track-header">
                <Image src="profile-blank.png" circle responsive />
            </Col>
            <Col xs={11} md={11} track-header>
                {this.props.track.name}
            </Col>
            </Row>
        </Grid>
    );

    return (
        <div className="row" id="track<?php echo $sub_meta_info['track_id'] ?>">
        <DeleteModal show={this.state.deleteShow} track={this.props.track} onHide={hideDelete} confirmdelete={this.confirmDelete}/>
        <Panel header={panelHeader}>
        <div className = "trackbox-player-wrap">
            <div className="col-sm-12">
                <div className="trackbox-player">
                    <ReactWavesurfer className=""
                    audioFile={this.props.track.streamUrl}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                    options={{
                        waveColor: 'violet',
                        progressColor: 'purple',
                        barWidth: 3,
                        hideScrollbar: true,
                        preload: "metadata",
                        backend: 'MediaElement',
                        mediaType:'audio'
                    }}
                    />
                </div>
            </div>
        </div>
        </Panel>
      </div>
    );
  }
}

export default TrackBox;
