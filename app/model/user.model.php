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
        if (isset($user_data['password']))
            $user_data['password_hash'] = password_hash($user_data['password'], PASSWORD_DEFAULT);
        else
            $user_data['password_hash'] = null;

        $user_data_cleaned = $this->permit($user_data, array('email',
                                                             'name',
                                                             'password_hash',
                                                             'level',
                                                             'status',));
        return $this->insert($user_data_cleaned);
    }

    public function authenticate($password)
    {
        if ($this->password_hash == null) return false;
        return password_verify($password, $this->password_hash);
    }

}

