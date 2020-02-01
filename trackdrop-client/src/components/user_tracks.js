import React, { Component } from 'react';
import { TrackUploadBox } from './track_upload_box.js'
import { TrackList } from './tracklist.js';
import axiosAuthed from '../lib/auth.js';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";

class UserTracks extends Component {
    constructor(props) {
        super(props);

        this.state = {
        tracks: {}
        };

        this.addTracks = this.addTracks.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    componentDidMount() {
        const axios = axiosAuthed();
        return axios.get('/api/v1/tracks').then((response) => { return response.data; })
        .then((json) => { this.setState({tracks: json.tracks}) });
    }

    addTracks(tracks) {
        this.setState(prevState => ({
        tracks: Array.from(tracks).concat(prevState.tracks)
        }));
    }

    removeTrack(id) {
        this.setState(prevState => ({
        tracks: prevState.tracks.filter(el => el.id !== id )
        }));
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} className={this.props.classes.layout}>
                    <Grid item xs={12}>
                        <TrackUploadBox addtracks={this.addTracks} />
                        <TrackList tracks={this.state.tracks} removetrack={this.removeTrack}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
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

const styledUserTracks = withStyles(styles)(UserTracks);
export { styledUserTracks as UserTracks };