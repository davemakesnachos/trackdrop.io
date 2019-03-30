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

        $result = $user->create($user_data);
        if ($result['status'] == "fail") {
            $response = json_response_fail(400, [], $result['error']);
        } else {
            $response = json_response_success(["id" => $result['user_id'] ]);
        }
        $this->data('response', $response);
    }

    public function get()
    {
        $response = ['user_id' => $this->params['id']];
        $this->data('response', $response);
    }

}