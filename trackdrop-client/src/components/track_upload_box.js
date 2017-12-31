import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
    iconFiletypes: ['.mp3'],
    showFiletypeIcon: true,
    postUrl: '/api/v1/track/upload'
};

var djsConfig = { autoProcessQueue: true }

export class TrackUploadBox extends Component {
    constructor(props) {
        super(props);

        this.uploadSuccess = this.uploadSuccess.bind(this);

        this.eventHandlers = {
            success: this.uploadSuccess.bind(this),
        }
    }



    uploadSuccess(file, response){
        this.props.addtracks(response.tracks);
    }

    render() {
        return (<div>
                <DropzoneComponent config={componentConfig}
                            djsConfig={djsConfig}
                            eventHandlers={this.eventHandlers} />
            </div>);
    }
}