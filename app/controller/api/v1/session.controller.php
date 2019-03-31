<?php

namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\UserModel;
use App\Model\SessionModel;

class SessionController extends Controller
{

    public function login()
    {
        $json_data_input = $this->params['json'];

        $email = $json_data_input['email'];
        $password = $json_data_input['password'];

        $user = UserModel::findBy(array("email" => $email));

        if (!$user) {
            $response = ['status' => 'User Not Found'];
            $this->data('response', $response);
            exit();
        }

        $logged_in = $user->authenticate($password);

        if (!$logged_in) {
            $response = json_response_fail(400, [], "User and password combination not found in database.");
        }

        if ($logged_in) {
            $session = new SessionModel();

            $result = $session->create($user->id);

            if ($result['status'] != 'fail') {
                $response = json_response_success(['token' => $result['token'] ]);
            } else {
                $response = json_response_fail(400, [],  'Not Logged In');
            }
        }

        $this->data('response', $response);
    }

    public function logout()
    {
        $session = SessionModel::checkSession();
        if (!$session) {
            $response = json_response_fail(404, [], "Invalid session token.");
        } else {
            $rows_deleted = $session->destroy();
            if ($rows_deleted == 1) {
                $response = json_response_success([]);
            } else {
                $response = json_response_fail(404, [], "Invalid session token.");
            }
        }

        $this->data('response', $response);
    }
}