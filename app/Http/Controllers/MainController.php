<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\Block;

class MainController extends Controller
{
    public function dashboard(){
        $userType = "admin";
        $username = "jmischka";
        $firstName = "Jacob";
        $lastName = "Mischka";
        $residents = factory(User::class, 10)->make();
        return view("app", compact("username", "userType", "firstName", "lastName", "residents"));
    }

    public function request(){
        $userType = "resident";
        $username = "jmischka";
        $firstName = "Jacob";
        $lastName = "Mischka";

        $residents = factory(User::class, 10)->make();
        $blocks = factory(Block::class, 10)->make();

        $selectTypes = [
            "resident" => "faculty",
            "faculty" => "residents",
            "admin" => "users"
        ];

        return view("evaluations.request", compact("username", "userType", "firstName", "lastName", "residents", "blocks", "selectTypes"));
    }

    public function requestBlock(Request $request){
        $block = $request->input("block");
        $residents = 
    }
}
