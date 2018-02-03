<?php

namespace Core;

use App\Model\SessionModel;
use App\Model\UserModel;
use App\Model\RestaurantUserModel;
use App\Model\RestaurantModel;

class Controller
{

    protected $asset;
    protected $view;
    protected $html_template = 'full'; // default html template
    protected $body_template; // default body template
    protected $data;
    protected $method;
    protected $params;
    protected $response;
    protected $redirect;
    protected $response_format = 'html'; // default response format
    protected $logged_in; // contains session data
    protected $user_data;
    protected $restaurant_data;
    protected $template;

    public function __construct($method, $params, $redirect = false)
    {
        $this->method = $method;
        $this->params = $params;
        $this->redirect = $redirect;

        $this->asset = new Asset();
        $this->view = new View();

        $this->logged_in = SessionModel::loggedIn();

        if($this->logged_in) {
            $session_data = SessionModel::checkSession();
            $this->user_data = UserModel::find($session_data->user_id);

            // store restaurant info as member variable
            $restaurant_user = RestaurantUserModel::findBy(['user_id' => $this->user_data->id]);
            if ($restaurant_user) {
                $this->restaurant_data = RestaurantModel::find($restaurant_user->restaurant_id);
            }
        }

        $this->data('is_logged_in', $this->logged_in);
        $this->data('user_data', $this->user_data);
        $this->data('restaurant_data', $this->restaurant_data);

    }

    protected function setHtmlTemplate($html_template)
    {
        $this->html_template = $html_template;
    }

    protected function setBodyTemplate($body_template)
    {
        $this->body_template = $body_template;
    }

    public function setResponseFormat($response_format)
    {
        $this->response_format = $response_format;
    }

    protected function data($key, $value)
    {
        $this->data[$key] = $value;
    }

    public function run()
    {
        call_user_func_array([$this, $this->method], $this->params);

        if (!$this->redirect)
            $this->processResponse();
    }

    protected function processResponse()
    {
        switch($this->response_format)
        {
            case 'raw':
                break;

            case 'json':
                $this->renderJson();
                break;

            case 'html':
            default:
                $this->renderHtml();
        }
    }

    private function renderJson()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-type:application/json');
        echo json_encode($this->data['response']);
    }

    private function renderHtml()
    {
        $this->asset->addCss('global.css');
        $this->asset->addCss('_vendor/bootstrap-social.css');
        $this->data['css_assets'] = $this->asset->getCss();
        $this->data['js_assets'] = $this->asset->getJs();
        $this->data['body_template'] = $this->body_template;
        $this->data['template'] = $this->template;

        echo $this->view->render($this->html_template, $this->data);
    }

    protected function setMetaInfo($meta_info)
    {
        $this->data['meta_info'] = $meta_info;
    }

    protected function secure($ignore_active = false)
    {
        if(!$this->logged_in) {
            header('Location: /');
            return;
        }

        if(!$ignore_active && $this->logged_in && $this->user_data->status == 0) {
            header('Location: /user/activate/');
            return;
        }
    }

}