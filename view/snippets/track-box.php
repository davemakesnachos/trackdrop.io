<div class="row <?php echo $sub_meta_info['track_row_type'] ?>" id="track<?php echo $sub_meta_info['track_id'] ?>">
	<div class = "trackbox-header">
		<div class="col-sm-5">
			<?php echo $sub_meta_info['track_name'] ?>
		</div>
		<div class = "col-sm-4">
			<button class="btn btn-primary btn-xs" onclick="playTrack('audio<?php echo $sub_meta_info['track_id'] ?>')">
				<i class="fa fa-play"></i>
				Play /
				<i class="fa fa-pause"></i>
				Pause
			</button>
			<a class="btn btn-success btn-xs" href="calls.php?a=download&id=<?php echo $sub_meta_info['track_id'] ?>">
				<i class="fa fa-download"></i>
				Download
			</a>
		</div>
		<div class="col-sm-3">
			<div class="delete-button" id = "delete-div-<?php echo $sub_meta_info['track_id'] ?>">
			    <button class="btn btn-xs btn-danger pull-right" onclick="deleteThis(track<?php echo $sub_meta_info['track_id'] ?>, <?php echo $sub_meta_info['track_id'] ?>)">
			      <i class="fa fa-trash"></i>
			      Delete
			    </button>
			</div>
			<div class="delete-confirm pull-right" id = "delete-confirm-div-<?php echo $sub_meta_info['track_id'] ?>">
				Are you sure?
				<button class="btn btn-xs btn-success" onclick="confirmDelete(track<?php echo $sub_meta_info['track_id'] ?>, <?php echo $sub_meta_info['track_id'] ?>)">
			      Yes
			    </button>
			    <button class="btn btn-xs btn-danger" onclick="cancelDelete(<?php echo $sub_meta_info['track_id'] ?>)">
			      No
			    </button>
			</div>
		</div>
	</div>
	<div class = "trackbox-player-wrap">
		<div class="col-sm-12"><div class="trackbox-player" id="audio<?php echo $sub_meta_info['track_id'] ?>"></div></div>
		<script>
			var trackData = <?php if (isset($sub_meta_info['track_data'])) echo $sub_meta_info['track_data']; ?>
			createPlayer('audio<?php echo $sub_meta_info['track_id'] ?>', '<?php echo SITE_URL . '/' .$sub_meta_info['track_url'] . '.mp3' ?>', trackData);
		</script>
	</div>
</div>

<hr />
