import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
    iconFiletypes: ['.mp3'],
    showFiletypeIcon: true,
    postUrl: '/upload.php'
};

var djsConfig = { autoProcessQueue: true }

export class TrackUploadBox extends Component {
    render() {
        return (<div>
                <DropzoneComponent config={componentConfig}
                            djsConfig={djsConfig} />
            </div>);
    }
}