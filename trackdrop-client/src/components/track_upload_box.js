import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
    iconFiletypes: ['.mp3'],
    showFiletypeIcon: true,
    postUrl: '/upload.php'
};

var djsConfig = { autoProcessQueue: true }
var eventHandlers = { addedfile: (file) => console.log(file) }

export class TrackUploadBox extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (<div>
                <DropzoneComponent config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />
            </div>);
    }
}