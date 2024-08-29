<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\UserEmployee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);
       $user = User::create($data);
       $token = $user->createToken($request->name);
       return [
            'user' => $user,
            'token' => $token
       ];
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $userid = Auth::user()->id;//ito nagpasa ako ng user_id mula ito sa users table para makuha ko siya sa localstorage
            $token = $user->createToken('auth_token')->plainTextToken;//kunin natin ang token ng nag login at idaan din natin sa localstorage

            return response()->json(['status' =>200, 'access_token' => $token, 'user_id' => $userid, 'token_type' => 'Bearer']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => "You are are logged out!",
        ];
    }


   ////////////////////count employees below //////////////////

   public function count(Request $request)
   {

       $sessionId = $request->header('X-Session-ID');
       $query = UserEmployee::query();
       if ($sessionId) {
           $query->where('user_id', $sessionId);
       }
       $count = $query->count();
       return response()->json(['count' => $count]);

   }

    ////////////////////end count employees below //////////////////

}
