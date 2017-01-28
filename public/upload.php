<?php
	require_once ("../core/bootstrap.php");

	use App\Model\TrackModel;

	$storeFolder = 'uploads'; 
	 
	$track = new TrackModel();

	if (!empty($_FILES)) {
	     
		$track->upload($_FILES['file']);
	     
	}
?>     