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

function createPlayer(id, audio)
{
	var wavesurfer = WaveSurfer.create({
	    container: '#' + id,
	    waveColor: 'violet',
	    progressColor: 'purple',
	    barWidth: 1,
	    hideScrollbar: true
	});

	var playerInfo = {
		wavesurferObj: wavesurfer,
		status: 'pause'
	}

	playerList[id] = playerInfo;

	wavesurfer.load(audio);
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