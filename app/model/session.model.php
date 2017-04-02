<?php
/*
 * app/model/session.model.php - Main session model
 *
 * Deatery (c) 2016
 */

namespace App\Model;

use Core\Model;

class SessionModel extends Model
{
    protected $table = "sessions";

    private function create($user_id)
    {
        $access_token = base64_encode(bin2hex(random_bytes(32)));
        $token_pair = array('token' => $access_token,
                            'user_id' => $user_id);
        $result = $this->insert($token_pair);

        return $access_token;
    }

    public function createWebSession($user_id)
    {
        $token = $this->create($user_id);
        if (!$token) {
            echo 'session creation error';
            return false;
        }

        /* 60 day cookie */
        $result = setcookie(get_config('web_token_cookie_name'), $token, time()+60*60*24*30, '/');

        return true;
    }

    public function destroySession()
    {
        setcookie(get_config('web_token_cookie_name'), '', time() - 3600);
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
        $token = (isset($_COOKIE[get_config('web_token_cookie_name')]) ? $_COOKIE[get_config('web_token_cookie_name')] : false);

        if (!$token) {
            return null;
        }

        $session = self::findBy(array("token" => $token));

        if ($session)
            return $session;
        else
            return null;
    }

    static function redirectIfLoggedIn($redirect)
    {
        $session = self::checkSession();

        if ($session) {
            return $session;
        } else {
            header("Location: $redirect");
            // TODO: error
            die();
        }
    }

    static function redirectIfNotLoggedIn($redirect)
    {
        $session = self::checkSession();

        if (!$session) {
            return $session;
        } else {
            header("Location: $redirect");
            // TODO: error
            die();
        }
    }
}

