<?php

namespace App\Http\Middleware;

use Closure;
use View;
use Auth;

use App\User;
use App\Form;
use App\Milestone;

class SharedVariables
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        View::share("user", Auth::user());

        if(Auth::user()->type == "admin"){
            $residents = User::where("type", "resident")->orderBy("training_level", "last_name")->get();
            $residentGroupNames = ["intern" => "Intern", "ca-1" => "CA-1", "ca-2" => "CA-2", "ca-3" => "CA-3", "fellow" => "Fellow"];
            $residentGroups = [
                "Intern" => [],
                "CA-1" => [],
                "CA-2" => [],
                "CA-3" => [],
                "Fellow" => []
            ];
            foreach($residents as $resident){
                $residentGroups[$residentGroupNames[$resident->training_level]][] = $resident;
            }
            View::share("residentGroups", $residentGroups);

            View::share("specificFaculty", User::where("type", "faculty")->orderBy("last_name")->get());
            View::share("facultyForms", Form::where("type", "faculty")->where("status", "active")->orderBy("title")->get());
			View::share("residentForms", Form::where("type", "resident")->where("evaluator_type", "staff")->where("status", "active")->orderBy("title")->get());

            $rForms = Form::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("title")->get();
            $formGroups = [];
            foreach($rForms as $form){
                if($form->type == "fellow")
                    $formGroups["fellow"][] = $form;
                elseif($form->evaluator_type == "staff")
                    $formGroups["staff"][] = $form;
                else
                    $formGroups["resident"][] = $form;
            }
			View::share("residentFormGroups", $formGroups);
        }

        $milestones = Milestone::orderBy("title")->get();
        foreach($milestones as $milestone){
            $milestoneGroups[ucfirst($milestone->type)." ".$milestone->training_level][] = $milestone;
        }

        View::share("milestoneGroups", $milestoneGroups);

        return $next($request);
    }
}
