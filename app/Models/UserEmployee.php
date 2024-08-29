<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEmployee extends Model
{

    protected $fillable = [
        'user_id',
        'employee_name',
        'employeeId',
        'branch',
        'designation',
        'availability',
        'status',
    ];

    use HasFactory;

    public function user(){
            return $this->belongsTo(User::class);

    }
}
