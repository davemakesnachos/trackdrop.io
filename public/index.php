<?php

	require_once ("../core/bootstrap.php");

	use App\Model\TrackModel;

	$storeFolder = 'uploads';

	$track = new TrackModel();

	$tracks = $track->findAll();
?>

<html>
<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js"></script>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<link href="https://fonts.googleapis.com/css?family=Oswald|Roboto" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
	<nav class="navbar navbar-default">
	  <div class="container">
	  <div class="navbar-brand">
	    trackdrop.io
	  </div>
	  </div>
	</nav>
	<div class = 'container'>
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

	<br />

<?php
	foreach($tracks as $t) {
		$template['track_name'] = $t->name;
		$template['track_url'] = 'stream/' . $t->hash;
		include '../view/snippets/track-box.php';
	}
?>

	</div>
</body>
</html>
