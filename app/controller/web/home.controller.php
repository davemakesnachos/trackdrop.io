<?php

namespace App\Controller\Web;

use Core\Controller;
use App\Model\TrackModel;

class HomeController extends Controller
{
    protected $template = 'home';

    public function home()
    {
        $storeFolder = 'uploads';

        $track = new TrackModel();

        $meta_info['tracks'] = $track->findAll();

        $this->setMetaInfo($meta_info);
        $this->setBodyTemplate('trackdrop/full.php');

        $this->asset->addCss('styles.css');
    }

}
