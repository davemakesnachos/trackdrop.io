import React, { Component, useState, useEffect } from 'react';
import TrackBox from './trackbox.js'
import {  } from './tracklist.js';
import axiosAuthed from '../lib/auth.js';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "./Footer/Footer.jsx";

function UserTrack(props) {
    const [data, setData] = useState({ tracks: [] });

    let profile = props.match.params.profile;
    let track = props.match.params.track;


    useEffect(() => {
      const axios = axiosAuthed();
      const fetchData = async () => {
        const response = await axios(
          '/api/v1/track/'+profile+'/'+track,
        );
        setData({tracks: response.data.tracks});
      };
      fetchData();
    }, []);
    let trackListRendered;
    if (data.tracks.length > 0) {
        trackListRendered = Object.keys(data.tracks).map(function(key) {
          return <TrackBox key={data.tracks[key].id} track={data.tracks[key]} />;
        });
    }

    return (
        <div>
            {(data.tracks.length > 0) ?
                <span> { trackListRendered } </span> :
                <span> Upload some tracks! </span>
            }
            <Footer />
        </div>
    );

}

const styles = theme => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }
  });

const styledUserTrack = withStyles(styles)(UserTrack);
export { styledUserTrack as UserTrack };