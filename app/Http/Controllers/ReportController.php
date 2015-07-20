<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Milestone;

class ReportController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["specific"]]);
    }

    public function needsEvaluations(){
        $milestones = Milestone::all();
        $data = compact("milestones");
        return view("report.needs-eval", $data);
    }

    public function getNeedsEvaluations(){
        $residents = User::where("status", "active")->where("type", "resident")->get();
        $milestones = Milestone::all();
        $sql = "select * from responses join evaluations on responses.evaluation_id=evaluations.id
        join milestones_questions on ";
        foreach($residents as $resident){
            
        }
    }

    public function getNeedsEvaluationsTSV(){

    }
}
