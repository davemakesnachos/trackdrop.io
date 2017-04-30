<?php

require_once('../core/bootstrap.php');

use App\Model\TrackModel;
use App\Model\TrackWaveDataModel;

$tracks = TrackModel::findAll(500, "created DESC");
foreach($tracks as $track)
{
	$trackWaveData = new TrackWaveDataModel;

	echo $track->hash . "\n";

	$track_id = $track->id;
	$file_hash = "../uploads/" . $track->hash;

	$tmpFilename = sys_get_temp_dir() . '/' . md5(uniqid(rand(), true));

	$wave_cmd = "audiowaveform --force-input-format=mp3 --force-output-format=json -i \"" . $file_hash . "\" --pixels-per-second 10 -b 8 -o " . $tmpFilename;

	$wave_cmd = escapeshellcmd($wave_cmd);

	exec($wave_cmd, $output, $ret);

	if ($ret)
		die ("Failed to process audio file and get waveform with command: \n". $wave_cmd);


	$twd = file_get_contents($tmpFilename);

	$trackWaveData->create($track_id, $twd);
}

