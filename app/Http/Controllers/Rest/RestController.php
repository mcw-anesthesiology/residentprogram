<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests;

use Auth;
use Hashids;

class RestController extends Controller
{
	protected $relationships = [];
	protected $attributes = [];
	protected $relationshipAttributes = [];

    public function __construct(){
        $this->middleware("auth");
        $this->middleware("type:admin");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
		$user = Auth::user();
		$withArray = [];
		if($request->has("with")){
			foreach(array_only($request->input("with"), $this->relationships) as $relationship => $fields){
				if(is_array($fields)){
					if(in_array("full_name", $fields)){
						$index = array_search("full_name", $fields);
						unset($fields[$index]);
						array_values($fields);
						$fields[] = "first_name";
						$fields[] = "last_name";
					}
					if($relationship == "form" && !in_array("visibility", $fields)){
						$fields[] = "visibility";
					}
					$withArray[$relationship] = function($query) use ($fields){
						$query->select(array_merge(["id"], $fields));
					};
				}
				else {
					if($fields && $fields !== "false")
						$withArray[] = $relationship;
				}
			}
		}

        $query = $this->model::with($withArray);
		foreach($request->intersect($this->attributes) as $name => $value){
			if(is_array($value)){
				if(count($value) == 2 && in_array($value[0], [
					'>',
					'<',
					'=',
					'>=',
					'<=',
					'!='
				]))
					$query->where($name, $value[0], $value[1]);
				else
					$query->whereIn($name, $value);
			}
			else {
				$query->where($name, $value);
			}
		}

		if($request->has("whereHas") && !empty($this->relationshipAttributes)){
			foreach(array_keys(array_only($request->input("whereHas"), array_keys($this->relationshipAttributes))) as $relationship){
				$relationshipAttributes = $this->relationshipAttributes[$relationship];
				$query->whereHas($relationship, function($query) use ($request, $relationship, $relationshipAttributes){
					foreach(array_only($request->input("whereHas")[$relationship], $relationshipAttributes) as $attribute => $value){
						if(is_array($value))
							$query->whereIn($attribute, $value);
						else
							$query->where($attribute, "=", $value);
					}
				});
			}
		}

		$query->take($request->input("limit"), null);
		
		if($request->has('orderBy')){
			$orderBy = $request->input('orderBy');
			$query->orderBy($orderBy[0], $orderBy[1]);
		}
		else
			$query->orderBy("id", $request->input("order", "desc"));
			
		$results = $query->get();

		if(!$user->isType("admin"))
			return $results->each(function($result){
				if(method_exists($result, "hideFields"))
					$result->hideFields();
				collect($result->getRelations())->each(function($rel){
					$rels = collect($rel);
					foreach($rels as $rel){
						if($rel && method_exists($rel, "hideFields"))
							$rel->hideFields();
					}
				});
			});

		return $results;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $this->model::create($request->all());
		if($request->ajax())
			return "success";
		else
			return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
		$user = Auth::user();
		try {
			$result = $this->model::with($this->relationships)->findOrFail($id);
		} catch (\Exception $e){
			$result = $this->model::with($this->relationships)->findOrFail(Hashids::decode($id)[0]);
		}

		if(!$user->isType("admin")){
			if(method_exists($result, "hideFields"))
				$result->hideFields();
			collect($result->getRelations())->each(function($rel){
				$rels = collect($rel);
				foreach($rels as $rel){
					if($rel && method_exists($rel, "hideFields"))
						$rel->hideFields();
				}
			});
		}

		return $result;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $this->model::findOrFail($id)->update($request->all());

		if($request->ajax())
			return "success";
		else
			return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id){
		if($this->model::destroy($id)){
			if($request->ajax())
				return "success";
			else
				return back();
		}
		else {
			if($request->ajax())
				throw new \Exception("Problem deleting object");
			else
				return back()->with("error", "Problem deleting object");
		}
    }
}
