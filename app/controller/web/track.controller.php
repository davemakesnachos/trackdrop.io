<?php

namespace App\Controller\Web;

use Core\Controller;
use App\Model\TrackModel;
use App\Model\TrackWaveDataModel;

class TrackController extends Controller
{
    public function download()
    {
        $track = new TrackModel();

        $id = $this->params['id'];
        $t = $track->find($id);

        header('Content-Type: application/octet-stream');
        header("Content-Transfer-Encoding: Binary");
        header("Content-disposition: attachment; filename=\"" . basename($t->name) . "\"");
        readfile($t->get_download_url());
    }
}
