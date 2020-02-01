import React, { Component } from 'react';
import '../App.css';
import { DeleteButton } from './trackbox_delete_modal.js';
import Waveform from './waveform.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from './CustomButtons/Button.jsx';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const styles = theme => ({
  card: {
    marginTop: '10px',
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  controlButton: {
    marginRight: theme.spacing.unit,
  },
  trackPlayerContent: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '-20px',
  },
  waveformBox: {
    display: 'inline',
    width: '100%',
    marginLeft: "10px",
  }
});

class TrackBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        playing: false,
        pos: 0,
        loaded: false,
        audioFile: ''
        };
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    handleTogglePlay() {
        if (!this.state.loaded) {
            this.setState({
                audioFile: this.props.track.streamUrl,
                loaded: true,
                playing: true
            })
        } else {
            this.setState({
                playing: !this.state.playing,
            });
        }
    }

    handlePosChange(e) {
        this.setState({
        pos: e.originalArgs[0]
        });
    }

    confirmDelete() {
        let removeTrack = this.props.removetrack;
        fetch('/api/v1/track/delete/' + this.props.track.id, {
            accept: 'application/json',
        }).then(() => {
            removeTrack(this.props.track.id);
        })
    }

    render() {
        const { classes } = this.props;

        return (
        <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                R
                </Avatar>
            }
            title={this.props.track.name}
            subheader={this.props.track.user}
            className={classes.cardHeader}
            />
            <CardContent className={classes.trackPlayerContent}>
                <Button large justIcon round onClick={this.handleTogglePlay} className={classes.controlButton}>
                    {(this.state.playing)
                        ? <PauseIcon />
                        : <PlayIcon />
                    }
                </Button>
                <div className={classes.waveformBox}>
                    <Waveform src={this.state.audioFile} audioPeaks={this.props.track.wave_data.data} playing={this.state.playing}></Waveform>
                </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
                <ShareIcon />
            </IconButton>
            </CardActions>
        </Card>
        );
    }
}

TrackBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackBox);