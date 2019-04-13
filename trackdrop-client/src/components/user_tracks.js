import React, { Component } from 'react';
import { TrackUploadBox } from './track_upload_box.js'
import { TrackList } from './tracklist.js';
import { Container } from 'semantic-ui-react'
import axiosAuthed from '../lib/auth.js';

export class UserTracks extends Component {
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
                <TrackUploadBox addtracks={this.addTracks} />
                <TrackList tracks={this.state.tracks} removetrack={this.removeTrack}/>
            </div>
        );
    }
}