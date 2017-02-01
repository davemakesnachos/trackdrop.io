<div class="row <?php echo $template['track_row_type'] ?>" id="track<?php echo $template['track_id'] ?>">
	<div class = "trackbox-header">
		<div class="col-sm-4">
			<?php echo $template['track_name'] ?>
		</div>
		<div class = "col-sm-6">
			<button class="btn btn-primary btn-xs" onclick="playTrack('audio<?php echo $template['track_id'] ?>')">
				<i class="fa fa-play"></i>
				Play /
				<i class="fa fa-pause"></i>
				Pause
			</button>
			<a class="btn btn-success btn-xs" href="calls.php?a=download&id=<?php echo $template['track_id'] ?>">
				<i class="fa fa-download"></i>
				Download
			</a>
		</div>
		<div class="col-sm-2">
		    <button class="btn btn-xs btn-danger pull-right" onclick="deleteThis(track<?php echo $template['track_id'] ?>, <?php echo $template['track_id'] ?>)">
		      <i class="fa fa-trash"></i>
		      Delete
		    </button>
		</div>
	</div>
	<div class = "trackbox-player-wrap">
		<div class="col-sm-12"><div class="trackbox-player" id="audio<?php echo $template['track_id'] ?>"></div></div>
		<script>
			createPlayer('audio<?php echo $template['track_id'] ?>', 'http://192.168.33.10/<?php echo $template['track_url'] ?>');
		</script>
	</div>
</div>

<hr />