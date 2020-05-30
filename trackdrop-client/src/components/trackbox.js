import React, { useState } from 'react';
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
import { withRouter, Link } from 'react-router-dom';

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

function TrackBox(props) {
    const initialTrackState = {
        playing: false,
        pos: 0,
        loaded: false,
        audioFile: ''
    };

    const [trackState, setTrackState] = useState(initialTrackState)

    const handleTogglePlay = () => {
        if (!trackState.loaded) {
            setTrackState({
                audioFile: props.track.streamUrl,
                loaded: true,
                playing: true
            })
        } else {
            setTrackState({
                ...trackState,
                playing: !trackState.playing,
            });
        }
    }

    const confirmDelete = () => {
        let removeTrack = props.removetrack;
        fetch('/api/v1/track/delete/' + props.track.id, {
            accept: 'application/json',
        }).then(() => {
            removeTrack(props.track.id);
        })
    }

    const { classes } = props;

    const trackUrl = '/track/' + props.track.user + '/' + props.track.name;
    const profileUrl = '/tracks/' + props.track.user;

    return (
        <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                R
                </Avatar>
            }
            title={ <Link to={trackUrl}>{props.track.name}</Link> }
            subheader={<Link to={profileUrl}>{props.track.user}</Link> }
            className={classes.cardHeader}
            />
            <CardContent className={classes.trackPlayerContent}>
                <Button large justIcon round onClick={handleTogglePlay} className={classes.controlButton}>
                    {(trackState.playing)
                        ? <PauseIcon />
                        : <PlayIcon />
                    }
                </Button>
                <div className={classes.waveformBox}>
                    <Waveform src={trackState.audioFile} audioPeaks={props.track.wave_data.data} playing={trackState.playing}></Waveform>
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

TrackBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackBox);