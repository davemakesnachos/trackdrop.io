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

        this.eventHandlers = {
            success: this.success,
        }
    }

    success(file, response) {
    }

    render() {
        return (<div>
                <DropzoneComponent config={componentConfig}
                            djsConfig={djsConfig}
                            eventHandlers={this.eventHandlers} />
            </div>);
    }
}