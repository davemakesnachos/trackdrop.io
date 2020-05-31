import React, { Component } from 'react';
import { TrackBox } from './trackbox.js';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        return (<div style={{display: 'flex', justifyContent: 'center'}}>
                  <span><br /><br /><br /><br /><br /><CircularProgress /> </span>
                </div>
                );
      }
    }
  }