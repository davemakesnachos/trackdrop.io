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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuCloseAndDeleteDialogOpen = () => {
        handleMenuClose();
        setDeleteDialogOpen(true);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const processDelete = () => {
        confirmDelete();
        handleDeleteDialogClose();
    };

    return (
        <div>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                aria-describedby="alert-delete-track-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to permanently delete {props.track.name}?
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    This action cannot be undone!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteDialogClose} color="primary" simple size="medium">
                    Cancel
                </Button>
                <Button onClick={processDelete} color="danger" size="medium" simple>
                    Delete Forever
                </Button>
                </DialogActions>
            </Dialog>
            <Card className={classes.card}>
                <Menu
                    id="more-actions-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    >
                    <MenuItem onClick={handleMenuCloseAndDeleteDialogOpen}>Delete Track</MenuItem>
                </Menu>
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
                    <div style={{ flex: 1 }}>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                    </div>
                <IconButton aria-label="More" onClick={ handleMenuClick }>
                    <MoreVertIcon />
                </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

TrackBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackBox);
