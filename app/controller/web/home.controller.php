<?php

namespace App\Controller\Web;

use Core\Controller;
use App\Model\TrackModel;
use App\Model\TrackWaveDataModel;

class HomeController extends Controller
{
    protected $template = 'home';

    public function home()
    {
        $storeFolder = 'uploads';

        $track = new TrackModel();

        $tracks = $track->findAll();

        foreach($tracks as $t) {
            $d = TrackWaveDataModel::findBy(array("track_id" => $t->id));
            if (isset($d))
                $t->wave_data = $d->data;
            $meta_info['tracks'][] = $t;
        }

        $this->setMetaInfo($meta_info);
        $this->setBodyTemplate('trackdrop/full.php');

        $this->asset->addCss('styles.css');
    }

}
