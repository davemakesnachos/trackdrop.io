<?php

namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\PasswordResetRequestModel;
use App\Model\UserModel;

class PasswordResetRequestController extends Controller
{

    public function create()
    {
        $json_data_input = $this->params['json'];
        $user = UserModel::findBy([ "email" => $json_data_input['email'] ]);
        $passwordResetRequest = new PasswordResetRequestModel();

        if ($user == null) {
            $response = json_response_success([]);
        } else {
            $password_reset_request['user_id'] = $user->id;
            $result = $passwordResetRequest->create($password_reset_request);
            if ($result['status'] == 'fail') {
                $response = json_response_fail(400, [], "Password reset request failed. Please try again later.");
            } else {
                $link = "" . SITE_URL . "/reset_password?token=" . $result['token'];
                send_email_forgot_password($user->email, $user->name, $link);
                $response = json_response_success([]);
            }
        }
        $this->data('response', $response);
    }

    public function validate()
    {
        $json_data_input = $this->params['json'];
        $token = $json_data_input['token'];
        $passwordResetRequest = PasswordResetRequestModel::findBy(array('token' => $token));

        if ($passwordResetRequest) {
            $response = json_response_success();
        } else {
            $response = json_response_fail(401, [], "Invalid Token.");
        }

        $this->data('response', $response);
    }
}