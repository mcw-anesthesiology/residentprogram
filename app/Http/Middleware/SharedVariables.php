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
            $residents = User::where("type", "resident")->where("status", "active")->orderBy("last_name")->get();
            $residentGroupNames = [
                "intern" => "Intern",
                "ca-1" => "CA-1",
                "ca-2" => "CA-2",
                "ca-3" => "CA-3",
                "fellow" => "Fellow"
            ];
            $residentGroups = [
                "Intern" => [],
                "CA-1" => [],
                "CA-2" => [],
                "CA-3" => [],
                "Fellow" => [],
                "Former Residents" => []
            ];
            foreach($residents as $resident){
                $residentGroups[$residentGroupNames[$resident->training_level]][] = $resident;
            }

            $formerResidents = User::formerResidents()->orderBy("last_name")->get();
            foreach($formerResidents as $resident){
                $residentGroups["Former Residents"][] = $resident;
            }

			$groupNames = [
                "intern" => "Intern",
                "ca-1" => "CA-1",
                "ca-2" => "CA-2",
                "ca-3" => "CA-3",
                "fellow" => "Fellow",
				"faculty" => "Faculty",
				"staff" => "Staff",
				"admin" => "Administrator"
            ];

			$userGroups = User::where("status", "active")->orderBy("last_name")
				->get()->groupBy(function($item) use ($groupNames){
					if($item["specific_type"] == "resident" && $item["training_level"])
						return $groupNames[$item["training_level"]];
					elseif($item["specific_type"])
						return $groupNames[$item["specific_type"]];
				})->sortBy(function($group, $name) use ($groupNames){
					return array_search($name, array_values($groupNames));
				});

            View::share("residentGroups", $residentGroups);
			View::share("userGroups", $userGroups);

            View::share("specificFaculty", User::where("type", "faculty")->orderBy("last_name")->get());
            View::share("facultyForms", Form::where("type", "faculty")->where("status", "active")->orderBy("title")->get());
			View::share("residentForms", Form::where("type", "resident")->where("evaluator_type", "staff")->where("status", "active")->orderBy("title")->get());

            $formGroups = Form::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("title")
				->get()->groupBy(function($form){
					if($form->type == "fellow")
						return "Fellow";
					elseif($form->evaluator_type == "staff")
						return "Staff";
					else
						return "Resident";
				});

			View::share("residentFormGroups", $formGroups);
			View::share("formGroups", $formGroups);
        }
        $milestoneGroups = [];
        $milestones = Milestone::orderBy("title")->get();
        foreach($milestones as $milestone){
            $milestoneGroups[ucfirst($milestone->type)." ".$milestone->training_level][] = $milestone;
        }

        View::share("milestoneGroups", $milestoneGroups);

        return $next($request);
    }
}
