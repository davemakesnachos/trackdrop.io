<?php

namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\TrackModel;
use App\Model\TrackWaveDataModel;
use App\Model\UserModel;

class TrackController extends Controller
{
    public function buildTrackObject($track)
    {
        $d = TrackWaveDataModel::findBy(array("track_id" => $track->id));
        if (isset($d))
            $track->wave_data = json_decode($d->data);
        $track->streamUrl = SITE_URL . "/stream/" . $track->hash . ".mp3";
        $track->downloadUrl = SITE_URL . "/track/download/" . $track->id;

        /* Populate user data */

        $u = UserModel::find($track->user_id);
        if (isset($u))
            $track->user = $u->name;
        return $track;
    }

    public function allTracks()
    {
        if (!$this->logged_in) {
            $response = json_response_fail(401, [], "Unauthorized");
            $this->data('response', $response);
            return;
        }

        $track = new TrackModel();

        $tracks = $track->findAll(500, "created DESC");

        if (empty($tracks)) {
            $track_list = array();
        } else {
            foreach($tracks as $t) {
                $t = $this->buildTrackObject($t);

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

    public function upload()
    {
        if (!$this->logged_in) {
            $response = json_response_fail(401, [], "User Not Authorized");
            $this->data('response', $response);
            return;
        }

        $track = new TrackModel();
        $user_id = $this->user_data->id;

        if (!empty($_FILES)) {
            $track_id_list[] = $track->upload($_FILES['file'], $user_id);
        }

        if (!empty($track_id_list)) {
            /* XXX: We must check for missing file/failed upload. */
            foreach($track_id_list as $track_id) {
                $t = TrackModel::find($track_id);
                $t = $this->buildTrackObject($t);
                $track_list[] = $t;
            }
        } else {
            $track_list = array();
        }

        $response['tracks'] = $track_list;
        $response = json_response_success($response);
        $this->data('response', $response);
    }
}
