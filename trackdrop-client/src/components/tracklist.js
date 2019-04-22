import React, { Component } from 'react';
import TrackBox from './trackbox.js';

export class TrackList extends Component {
    render() {
      let trackList = this.props.tracks;
      let removetrack = this.props.removetrack;
      if (trackList.length > 0) {
        const trackListRendered = Object.keys(trackList).map(function(key) {
          return <TrackBox key={trackList[key].id} track={trackList[key]} removetrack={removetrack} />;
        });

        return (<span> {trackListRendered} </span>);
      } else {
        return (<span> Upload some tracks! </span>);
      }
    }
  }