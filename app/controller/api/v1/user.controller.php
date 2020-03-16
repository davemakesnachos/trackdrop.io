<?php
/*
 * app/controller/api/user.controller.php - User controller
 *
 * Trackdrop (c) 2019
 */
namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\UserModel;
use App\Model\InviteCodeModel;

class UserController extends Controller
{

    public function register()
    {
        $user = new UserModel();
        $inviteCode = new InviteCodeModel();

        $json_data_input = $this->params['json'];
        $user_data = array("email" => $json_data_input['email'],
                           "password" => $json_data_input['password'],
                           "name" => $json_data_input['name']);


        if (!array_key_exists('code', $json_data_input) || $json_data_input['code'] == "") {
            $result['status'] = '400';
            $result["error"] = "The 'code' field must be provided.";
            $result["field"] = "code";
            $response = json_response_fail(400, [], $result['error']);
            $this->data('response', $response);
            return;
        } else {
            $code = $json_data_input['code'];
        }

        $result = $inviteCode->check($code);
        if ($result == NULL) {
            $response = json_response_fail(400, [], 'Invalid invite code provided!');
            $result["field"] = "code-validation";
            $this->data('response', $response);
            return;
        }

        $result = $user->create($user_data);
        if ($result['status'] == "fail") {
            $response = json_response_fail(400, [], $result['error']);
        } else {
            // XXX: Must check error
            $inviteCode->markUsed($code);
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