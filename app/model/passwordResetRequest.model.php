<?php
/*
 * app/model/inviteCode.model.php - Model for invite codes
 *
 * Trackdrop (c) 2019
 */

namespace App\Model;

use Core\Model;

class PasswordResetRequestModel extends Model
{
    protected $table = "password_reset_requests";

    public function generateToken()
    {
        return bin2hex(random_bytes(32));
    }

    public function create($reset_password_request_data)
    {
        $user_id = $reset_password_request_data['user_id'];
        $token = $this->generateToken();
        $reset_password_request_data_cleaned = array('token' => $token,
                                                     'user_id' => $user_id);
        try {
            $insert_id = $this->insert($reset_password_request_data_cleaned);
        } catch (\PDOException $e) {
            print_r($e);
            $error['status'] = 'fail';
            return $error;
        }

        $result['status'] = 'ok';
        $result['token'] = $token;

        return $result;
    }
}