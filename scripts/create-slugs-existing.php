<?php

require_once('../core/bootstrap.php');

use App\Model\TrackModel;

$tracks = TrackModel::findAll(500, "created DESC");
foreach($tracks as $track)
{

	$track_id = $track->id;

	$withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $track->name);

	$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $withoutExt)));
    $slug = rtrim($slug, "-");

    $idx = 1;
    $original_slug = $slug;

    while (isset($hash_map[$slug])) {
        $slug = $original_slug . '-' . $idx;
        $idx++;
    }

    $hash_map[$slug] = True;
    $track->update(array("slug" => $slug));

    echo $track->name. " ->  " . $slug  . "\n";
}

