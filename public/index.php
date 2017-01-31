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
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.0.52/wavesurfer.min.js"></script>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<link href="https://fonts.googleapis.com/css?family=Oswald|Roboto" rel="stylesheet">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/main.js"></script>
</head>

<body>
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">track<span class = "navbar-brand-accent">drop</span>.io</a>
        </div>
        <div class="navbar-collapse collapse navbar-right">
          <ul class="nav navbar-nav">
            <li><a href="index.php">home</a></li>
   		  </ul>
   		</div><!--/.nav-collapse -->
      </div>
    </div>




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
</body>
</html>
