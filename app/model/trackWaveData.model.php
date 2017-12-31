<?php
/*
 * app/model/trackWaveData.model.php - Main track model
 *
 * Trackdrop (c) 2017
 */
namespace App\Model;

use Core\Model;

class TrackWaveDataModel extends Model
{
	protected $table = "track_wave_data";

	public function create($track_id, $wave_json)
	{
		$track_wave['track_id'] = $track_id;
		$track_wave['data'] = addslashes($wave_json);

        $track_wave_cleaned = $this->permit($track_wave, array('track_id',
                                                         'data',));
        return $this->insert($track_wave_cleaned);
	}

	public function build_waveform($file_hash)
	{
		$tmpFilename = sys_get_temp_dir() . '/' . md5(uniqid(rand(), true));

		$wave_cmd = "audiowaveform --force-input-format=mp3 --force-output-format=json -i \"" . $file_hash . "\" --pixels-per-second 10 -b 8 -o " . $tmpFilename;

		$wave_cmd = escapeshellcmd($wave_cmd);

		exec($wave_cmd, $output, $ret);

		if ($ret)
			die ("Failed to process audio file and get waveform with command: \n". $wave_cmd);

		return file_get_contents($tmpFilename);
	}
}
