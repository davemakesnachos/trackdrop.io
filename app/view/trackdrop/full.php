	<div class = 'container'>
	    <div class = "dropzone-wrap">

			<form action="/upload.php" class="dropzone">
			  <div class="fallback">
				<br />
				<br />
				<br />

			    <input name="file" type="file" multiple />
				<br />
				<br />
				<br />
			  </div>
			</form>
		</div>

	<br />

<?php
	if (!empty($tracks)) {
		$row_count = 0;
		foreach($tracks as $t) {
			$template['track_name'] = $t->name;
			$template['track_url'] = 'stream/' . $t->hash;
			$template['track_id'] = $t->id;

			include '../view/snippets/track-box.php';
		}
	} else {
		include '../view/snippets/empty-list.php';
	}
?>

</div>