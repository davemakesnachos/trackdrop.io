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
	$tracks = $meta_info['tracks'];

	if (!empty($tracks)) {
		$row_count = 0;
		foreach($tracks as $t) {
			$sub_meta_info['track_name'] = $t->name;
			$sub_meta_info['track_url'] = 'stream/' . $t->hash;
			$sub_meta_info['track_id'] = $t->id;
			if (isset($t->wave_data))
				$sub_meta_info['track_data'] = $t->wave_data;

			include '../view/snippets/track-box.php';
		}
	} else {
		include '../view/snippets/empty-list.php';
	}
?>

</div>