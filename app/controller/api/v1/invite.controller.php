<?php

namespace App\Controller\Api\v1;

use Core\Controller;
use App\Model\InviteCodeModel;
use App\Model\UserModel;

class InviteController extends Controller
{

    public function create()
    {
        if (!$this->logged_in) {
            $response = json_response_fail(401, [], "Unauthorized");
            $this->data('response', $response);
            return;
        }

        $user = new UserModel();
        $inviteCode = new InviteCodeModel();

        $json_data_input = $this->params['json'];

        $result = $user->findBy([ "email" => $json_data_input['email'] ]);
        if ($result == null) {
            $invite_result = $inviteCode->create($json_data_input);
            $response = json_response_success($invite_result);
        } else {
            $response['status'] = '400';
            $response["error"] = "Email address already associated with an account.";
        }
        $this->data('response', $response);
    }

    public function validate()
    {
        $inviteCode = new InviteCodeModel();

        $json_data_input = $this->params['json'];
        $code = $json_data_input['code'];
        $check = $inviteCode::check($code);

        if ($check) {
            $response = json_response_success();
        } else {
            $response = json_response_fail(401, [], "Invalid Code.");
        }

        $this->data('response', $response);
    }
}