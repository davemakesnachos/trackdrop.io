<?php

namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\TrackModel;
use App\Model\TrackWaveDataModel;

class TrackController extends Controller
{
    public function allTracks()
    {
        $track = new TrackModel();

        $tracks = $track->findAll(500, "created DESC");

        if (empty($tracks)) {
            $track_list = array();
        } else {
            foreach($tracks as $t) {
                $d = TrackWaveDataModel::findBy(array("track_id" => $t->id));
                if (isset($d))
                    $t->wave_data = json_decode($d->data);
                $t->streamUrl = SITE_URL . "/stream/" . $t->hash . ".mp3";
                $t->downloadUrl = SITE_URL . "/track/download/" . $t->id;
                $track_list[] = $t;
            }
        }

        $response['tracks'] = $track_list;
        $response = json_response_success($response);
        $this->data('response', $response);
    }

    public function delete()
    {
        $track = new TrackModel();

        $id = $this->params['id'];

        $track->delete("id = \"" . $id. "\"");

        $response = json_response_success();
        $this->data('response', $response);
    }
}
