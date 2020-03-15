<?php
/*
 * app/model/inviteCode.model.php - Model for invite codes
 *
 * Trackdrop (c) 2019
 */

namespace App\Model;

use Core\Model;

class InviteCodeModel extends Model
{
    protected $table = "invite_codes";
    public function generateCode()
    {
        return substr(str_shuffle(str_repeat("23456789abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", 10)), 0, 10);
    }

    public function create($invite_data)
    {
        $email = $invite_data['email'];
        $code = $this->generateCode();
        $code_pair = array('code' => $code,
                           'email' => $email);
        try {
            $insert_id = $this->insert($code_pair);
        } catch (\PDOException $e) {
            print_r($e);
            $error['status'] = 'fail';
            return $error;
        }

        $result['status'] = 'ok';
        $result['token'] = $code;
        $result['email'] = $email;

        return $result;
    }

    public function check($code)
    {
        $inviteCode = self::findBy(array("code" => $code, "used" => FALSE));

        if ($inviteCode)
            return $inviteCode;
        else
            return NULL;
    }

    public function markUsed($code)
    {
        return self::update(array("used" => TRUE), "code = \"$code\"");
    }

}

