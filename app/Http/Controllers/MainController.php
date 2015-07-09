<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\Block;
use App\BlockAssignment;
use App\Form;

class MainController extends Controller
{
    public function dashboard(){
        $user = User::where("username", "jmischka")->first();

        $residents = User::where("type", "resident")->get();
        $data = compact("user", "residents");
        return view("dashboard.".$user->type, $data);
    }

    public function request(){
        $user = User::where("username", "jmischka")->first();

        $residents = User::where("type", "resident")->get();
        $blocks = Block::all();

        $selectTypes = [
            "resident" => "faculty",
            "faculty" => "residents",
            "admin" => "users"
        ];

        return view("evaluations.request", compact("user", "residents", "blocks", "selectTypes"));
    }

    public function requestBlock(Request $request){
        $user = User::where("username", "jmischka")->first();

        //$blockId = $request->input("block");
        //$assignments = Block::where("id", $blockId)->assignments();
        $residents = User::where("type", "resident")->get();
        $faculty = User::where("type", "faculty")->get();
        $forms = Form::all();

        return response()->view("evaluations.request-block", compact("user", "block", "residents", "faculty", "forms"));
    }
}
