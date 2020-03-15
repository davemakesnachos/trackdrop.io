<?php
/*
 * app/model/user.model.php - Main user model
 *
 * Trackdrop (c) 2019
 */

namespace App\Model;

use Core\Model;

class UserModel extends Model
{
    protected $table = "users";

    public function create($user_data)
    {
        if ($user_data['email'] == "") {
            $error['status'] = 'fail';
            $error["error"] = "The 'email' field must be provided.";
            $error["field"] = "email";
        }

        if ($user_data['password'] == "") {
            $error['status'] = 'fail';
            $error["error"] = "The 'password' field must be provided.";
            $error["field"] = "password";
        }

        if ($user_data['name'] == "") {
            $error['status'] = 'fail';
            $error["error"] = "The 'name' field must be provided.";
            $error["field"] = "name";
        }

        if (isset($error))
            return $error;

        if (isset($user_data['password']))
            $user_data['password_hash'] = password_hash($user_data['password'], PASSWORD_DEFAULT);
        else
            $user_data['password_hash'] = null;

        $user_data_cleaned = $this->permit($user_data, array('email',
                                                             'name',
                                                             'password_hash',
                                                             'level',
                                                             'status',));

        try {
            $insert_id = $this->insert($user_data_cleaned);
        } catch (\PDOException $e) {
            $error['status'] = 'fail';
            switch($e->getCode()) {
                case "23000":
                    $str = $e->getMessage();
                    if (strpos($str, 'email') !== FALSE) {
                        $error["error"] = "This email is already in use.";
                        $error["field"] = "email";
                    } else if (strpos($str, 'name') !== FALSE) {
                        $error["error"] = "This name is already in use.";
                        $error["field"] = "name";
                    } else {
                        $error["error"] = "Unknown Error.";
                    }
                    break;
                default:
                    $error["error"] = "Unknown Error.";
                    break;
            }

            return $error;
        }
        $result['user_id'] = $insert_id;
        $result['status'] = 'OK';
        return $result;
    }

    public function authenticate($password)
    {
        if ($this->password_hash == null) return false;
        return password_verify($password, $this->password_hash);
    }

}

