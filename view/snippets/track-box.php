<div class="row <?php echo $template['track_row_type'] ?>" id="track<?php echo $template['track_id'] ?>">
	<div class="col-sm-3"><?php echo $template['track_name'] ?></div>
	<div class="col-sm-6"><audio src="<?php echo $template['track_url'] ?>" controls id="audio"></audio></div>
	<div class="col-sm-1"> </div>
	<div class="col-sm-2">
		<nav class="cl-effect-15">
			<a onClick = "deleteThis(track<?php echo $template['track_id'] ?>, <?php echo $template['track_id'] ?>)">Delete</a>
		</nav>
	</div>
</div>