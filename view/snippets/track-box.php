<div class="row <?php echo $template['track_row_type'] ?>" id="track<?php echo $template['track_id'] ?>">
	<div class = "trackbox-header">
		<div class="col-sm-5">
			<?php echo $template['track_name'] ?>
		</div>
		<div class = "col-sm-4">
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
		<div class="col-sm-3">
			<div class="delete-button" id = "delete-div-<?php echo $template['track_id'] ?>">
			    <button class="btn btn-xs btn-danger pull-right" onclick="deleteThis(track<?php echo $template['track_id'] ?>, <?php echo $template['track_id'] ?>)">
			      <i class="fa fa-trash"></i>
			      Delete
			    </button>
			</div>
			<div class="delete-confirm pull-right" id = "delete-confirm-div-<?php echo $template['track_id'] ?>">
				Are you sure?
				<button class="btn btn-xs btn-success" onclick="confirmDelete(track<?php echo $template['track_id'] ?>, <?php echo $template['track_id'] ?>)">
			      Yes
			    </button>
			    <button class="btn btn-xs btn-danger" onclick="cancelDelete(<?php echo $template['track_id'] ?>)">
			      No
			    </button>
			</div>
		</div>
	</div>
	<div class = "trackbox-player-wrap">
		<div class="col-sm-12"><div class="trackbox-player" id="audio<?php echo $template['track_id'] ?>"></div></div>
		<script>
			createPlayer('audio<?php echo $template['track_id'] ?>', '<?php echo SITE_URL . '/' .$template['track_url'] ?>');
		</script>
	</div>
</div>

<hr />