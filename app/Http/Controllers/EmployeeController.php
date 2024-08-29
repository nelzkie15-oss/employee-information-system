<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\UserEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class EmployeeController extends Controller implements HasMiddleware
{

    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index','show']),
        ];
    }

    public function index(Request $request)
    {

        $sessionId = $request->header('X-Session-ID');
        $perPage = $request->input('per_page', 5);
        $page = $request->input('page', 1);
        $query = UserEmployee::query();
        if ($sessionId) {
            $query->where('user_id', $sessionId);
        }
        $emps = $query->paginate($perPage);
      //  dd($emps);
         return response()->json($emps);

    }


    public function store(Request $request)
    {
        $fields = $request->validate([
           // 'user_id' => 'required|max:255',
            'employee_name' => 'required|max:255',
            'employeeId' => 'required',
            'branch' => 'required',
            'designation' => 'required',
            'availability' => 'required',
            'status' => 'required'
        ]);

        $employees = $request->user()->useremployees()->create($fields);

        return ['post' => $employees, 'user' => $employees->user];
    }


    public function show($id)
    {
        $item = UserEmployee::find($id);
        return response()->json($item);
    }
    public function update(Request $request, UserEmployee $employee)
    {
        //Gate::authorize('modify', $employee);
        $emp = UserEmployee::find($request->id);
        $emp->employee_name = $request->input('employee_name');
        $emp->employeeId = $request->input('employeeId');
        $emp->branch = $request->input('branch');
        $emp->designation = $request->input('designation');
        $emp->availability = $request->input('availability');
        $emp->status = $request->input('status');
        $emp->save();

        return response()->json(['message' => 200, 'post' => $emp, 'user' => $emp->user]);
    }


    public function destroy(UserEmployee $employee)
    {
        Gate::authorize('modify', $employee);

        $data = $employee->delete();

        return ["message" => "Deleted Data Successfully"];

    }
}
