// components/waveform.js
import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'

export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillUpdate(nextProps, nextState) {
      if (this.props.src != nextProps.src) {
        this.wavesurfer.load(nextProps.src, this.props.audioPeaks, false)
      }

      if (this.props.playing != nextProps.playing) {
          this.wavesurfer.playPause();
      }
  }
  componentDidMount() {
    console.log("inside");
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 2,
      height: 100,
      hideScrollbar: true,
      cursorWidth: 0,
    })
    this.wavesurfer.load(this.props.src, this.props.audioPeaks, false)
    console.log(this.props.src)
  }
  componentWillUnmount() {

  }
  render() {
      console.log(this.props.src)
    return (
      <div className='waveform'>
        <div className='wave'></div>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}