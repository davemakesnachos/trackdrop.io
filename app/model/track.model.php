<?php
/*
 * app/model/track.model.php - Main track model
 *
 * Trackdrop (c) 2016
 */
namespace App\Model;

use Core\Model;
use App\Model\TrackWaveDataModel;

class TrackModel extends Model
{
	protected $table = "tracks";

	public function create($file, $hash, $user_id)
	{
        $file['hash'] = $hash;
        $file['user_id'] = $user_id;

        $track_data_cleaned = $this->permit($file, array('name',
                                                         'size',
                                                         'hash',
                                                         'user_id'));
        return $this->insert($track_data_cleaned);
	}

	public function upload($file, $user_id = 0)
	{
		$trackWaveData = new TrackWaveDataModel;

		$tempFile = $file['tmp_name'];

	    $targetPath = get_config('upload_folder') . '/';

	    $file_hash = $this->hash_file($file);

	    $targetFile =  $targetPath . $file_hash . '.mp3';

	    $twd = $trackWaveData->build_waveform($tempFile);

	    $ret = move_uploaded_file($tempFile, $targetFile);

	    if (!$ret) {
			if (!file_exists($targetFile))
				return $ret;
	    }

	    $track_id = $this->create($file, $file_hash, $user_id);

	    $trackWaveData->create($track_id, $twd);

	    return $track_id;
	}

	public function get_download_url()
	{
		if (!isset($this->hash))
			return NULL;

		return get_config('upload_folder') . '/' . $this->hash . '.mp3';
	}

	public function hash_file($file)
	{
		$file = fopen($file['tmp_name'], 'rb');

		if ($file == false)
			return false;

		while (!feof($file))
		{
			$sha_hash_ctx = hash_init('sha256');

			$file_data = null;

			$data = fread($file, 4096);
			hash_update($sha_hash_ctx, $data);
		}

		$file_sha_hash = hash_final($sha_hash_ctx); //get file hash

		return	$file_sha_hash;
	}

	static public function find_by_slug_and_user($slug, $user_id)
	{
		return $this::findBy(['slug' => $slug, 'user_id' => $user_id]);
	}
}
