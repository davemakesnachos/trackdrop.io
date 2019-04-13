<?php
/*
 * app/model/session.model.php - Main session model
 *
 * Trackdrop (c) 2019
 */

namespace App\Model;

use Core\Model;

class SessionModel extends Model
{
    protected $table = "sessions";

    public function create($user_data)
    {
        $access_token = base64_encode(bin2hex(random_bytes(32)));
        $token_pair = array('token' => $access_token,
                            'user_id' => $user_data);
        $insert_id = $this->insert($token_pair);

        $result['status'] = 'ok';

        $result['token'] = $access_token;

        return $result;
    }

    public function destroy()
    {
        return $this->delete('id = ' . $this->id);
    }

    static function loggedIn()
    {
        $session = self::checkSession();

        if ($session)
            return true;
        else
            return false;
    }

    static function checkSession()
    {
        $headers = $_SERVER;
        $token = (isset($headers['HTTP_AUTHORIZATION']) ? $headers['HTTP_AUTHORIZATION'] : false);

        if (!$token) {
            return null;
        }

        $token = explode(" ", $token);

        if ($token[0] == 'Bearer')
            $token = $token[1];

        $session = self::findBy(array("token" => $token));



        if ($session)
            return $session;
        else
            return null;
    }
}
