import React, { Component } from 'react';
import '../App.css';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
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
        <div className="row" id="track<?php echo $sub_meta_info['track_id'] ?>">
        <div className = "trackbox-header">
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
                    <button className="btn btn-xs btn-danger pull-right" onclick="deleteThis(track<?php echo $sub_meta_info['track_id'] ?>, <?php echo $sub_meta_info['track_id'] ?>)">
                    <i className="fa fa-trash"></i>
                    Delete
                    </button>
                </div>
                <div className="delete-confirm pull-right" id = "delete-confirm-div-<?php echo $sub_meta_info['track_id'] ?>">
                    Are you sure?
                    <button className="btn btn-xs btn-success" onclick="confirmDelete(track<?php echo $sub_meta_info['track_id'] ?>, <?php echo $sub_meta_info['track_id'] ?>)">
                    Yes
                    </button>
                    <button className="btn btn-xs btn-danger" onclick="cancelDelete(<?php echo $sub_meta_info['track_id'] ?>)">
                    No
                    </button>
                </div>
            </div>
        </div>
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
                        barWidth: 1,
                        hideScrollbar: true,
                        preload: "metadata",
                        backend: 'MediaElement',
                        mediaType:'audio'
                    }}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default TrackBox;
