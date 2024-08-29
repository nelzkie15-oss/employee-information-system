<?php

namespace App\Policies;

use App\Models\UserEmployee;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmployeePolicy
{


    public function modify(User $user, UserEmployee $employee): Response
    {
        return $user->id === $employee->user_id
               ? Response::allow()
               : Response::deny('You do not own this post'); //iniiwasan nito na magdelete yung hindi siya may ari ng post
    }
}
