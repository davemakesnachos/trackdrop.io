<?php
	require_once ("../core/bootstrap.php");

	use App\Model\TrackModel;

	$storeFolder = 'uploads'; 
	 
	$track = new TrackModel();

	switch ($_GET['a']) {
		case 'delete':
			$id = $_GET['id'];
			$t = $track->find($id);
			$ret = $track->delete("id = \"" . $id. "\"");

			if ($ret == 0)
				header("HTTP/1.0 404 Not Found");

			break;

		case 'download':
			$id = $_GET['id'];
			$t = $track->find($id);

			header('Content-Type: application/octet-stream');
			header("Content-Transfer-Encoding: Binary");
			header("Content-disposition: attachment; filename=\"" . basename($t->name) . "\"");
			readfile($t->get_download_url());

			break;
	}
?>     