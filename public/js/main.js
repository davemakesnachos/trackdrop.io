function deleteThis(div, id)
{
	$("#delete-div-" + id).fadeOut(.2, function() {
		$("#delete-confirm-div-" + id).fadeIn();
	});
}

function cancelDelete(id)
{
	$("#delete-confirm-div-" + id).fadeOut(.2, function() {
		$("#delete-div-" + id).fadeIn();
	});
}

function confirmDelete(div, id)
{
	var jqxhr = $.get( "calls.php?a=delete&id=" + id, function() {
		$(div).fadeOut();
	})
	.fail(function() {
		alert( "error deleting track" );
	});
}

var playerList = [];

function createPlayer(id, audio, data)
{
	var wavesurfer = WaveSurfer.create({
	    container: '#' + id,
	    waveColor: 'violet',
	    progressColor: 'purple',
	    barWidth: 1,
	    hideScrollbar: true,
	    preload: "metadata",
		backend: 'MediaElement',
		mediaType:'audio'
	});

	var playerInfo = {
		wavesurferObj: wavesurfer,
		status: 'pause',
	}

	playerList[id] = playerInfo;

	wavesurfer.song = audio;
	wavesurfer.backend.peaks = data.data;
	wavesurfer.drawBuffer();

	wavesurfer.loaded = false;

	wavesurfer.on("play", function () {
	    if(!wavesurfer.loaded) {
	        wavesurfer.load(wavesurfer.song, wavesurfer.backend.peaks);
	    }
	});

	wavesurfer.on("ready", function () {
	    if(!wavesurfer.loaded) {
	        wavesurfer.loaded = true;
	        wavesurfer.play();
	    }
	});
}

function playTrack(id)
{
	if (playerList[id].status == "pause") {
		playerList[id].wavesurferObj.play();
		playerList[id].status = "play";
	}
	else {
		playerList[id].wavesurferObj.pause();
		playerList[id].status = "pause";
	}
}