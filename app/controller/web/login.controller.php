<?php

namespace App\Controller\Web;

use Core\Controller;

class LoginController extends Controller
{
    protected $template = 'home';

    public function login()
    {
        if($this->logged_in) {
            header('Location: /user/home/');
            return;
        }

        $meta_info = [
            'title' => 'trackdrop.io - Collaboration made simple',
	];

        $this->setMetaInfo($meta_info);
        $this->setBodyTemplate('login/full.php');

        $this->asset->addCss('main.css');
        $this->asset->addCss('login.css');
    }

}
