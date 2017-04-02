<?php

namespace App\Controller\Web;

use Core\Controller;

class HomeController extends Controller
{
    protected $template = 'home';

    public function home()
    {
        if($this->logged_in) {
            header('Location: /user/home/');
            return;
        }

        $meta_info = [
            'title' => 'trackdrop.io - Collaborate made simple',
            'description' => "Deatery is the best website in the whole wide world!",
	];

        $this->setMetaInfo($meta_info);
        $this->setBodyTemplate('trackdrop/full.php');

        $this->asset->addCss('styles.css');
    }

}
