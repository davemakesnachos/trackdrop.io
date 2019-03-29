<?php
/*
 * app/controller/api/user.controller.php - User controller
 *
 * Trackdrop (c) 2019
 */
namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\UserModel;

class UserController extends Controller
{

    public function register()
    {
        $user = new UserModel();

        $json_data_input = $this->params['json'];
        $user_data = array("email" => $json_data_input['email'],
                           "password" => $json_data_input['password'],
                           "name" => $json_data_input['name']);

        $user_id = $user->create($user_data);
        $response = ['status' => 'OK'];
        $this->data('response', $response);
    }

    public function get()
    {
        $response = ['user_id' => $this->params['id']];
        $this->data('response', $response);
    }

}