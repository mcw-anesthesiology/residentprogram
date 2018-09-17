<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests;

use Auth;
use Hashids;
use Log;

class RestController extends Controller
{
	protected $relationships = [];
	protected $attributes = [];
	protected $relationshipAttributes = [];
	protected $revealable = [];

    public function __construct() {
        $this->middleware("auth");
        $this->middleware("type:admin");
    }

	protected function getWithArray(Request $request) {
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
					if ($relationship == "form") {
						if (!in_array("visibility", $fields))
							$fields[] = "visibility";
						if (!in_array('type', $fields))
							$fields[] = 'type';
					}

					// FIXME: This doesn't work with many-to-many relationships
					$withArray[$relationship] = function($query) use ($fields) {
						$query->select(array_merge(["id"], $fields));
					};
				}
				else {
					if ($fields && $fields !== "false")
						$withArray[] = $relationship;
				}
			}
		}

		return $withArray;
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
		$user = Auth::user();
        $query = $this->model::with($this->getWithArray($request));

		foreach(array_filter($request->only($this->attributes)) as $name => $value){
			if(is_array($value)){
				if (!is_array($value[0])) {
					$value = [$value];
				}

				foreach($value as $valueEntry) {
					if(count($valueEntry) == 2 && in_array($valueEntry[0], [
						'>',
						'<',
						'=',
						'>=',
						'<=',
						'!='
					]))
						$query->where($name, $valueEntry[0], $valueEntry[1]);
					else
						$query->whereIn($name, $valueEntry);
				}
			} else {
				$query->where($name, $value);
			}
		}

		if ($request->has('has') && !empty($this->relationshipAttributes)) {
			foreach (array_only($request->input('has'), $this->relationshipAttributes) as $relationship) {
				$query->has($relationship);
			}
		}

		if ($request->has("whereHas") && !empty($this->relationshipAttributes)) {
			foreach (array_keys(array_only($request->input("whereHas"), array_keys($this->relationshipAttributes))) as $relationship) {
				$relationshipAttributes = $this->relationshipAttributes[$relationship];
				$query->whereHas($relationship, function($query) use ($request, $relationship, $relationshipAttributes) {
					foreach (array_only($request->input("whereHas")[$relationship], $relationshipAttributes) as $attribute => $value) {
						if (is_array($value))
							$query->whereIn($attribute, $value);
						else
							$query->where($attribute, "=", $value);
					}
				});
			}
		}

		$query->take($request->input("limit"), null);

		if ($request->has('orderBy')) {
			$orderBy = $request->input('orderBy');
			$query->orderBy($orderBy[0], $orderBy[1]);
		}
		else
			$query->orderBy("id", $request->input("order", "desc"));

		$results = $query->get($request->get('only'));

		if ($request->has('revealing') && !empty($this->revealable)) {
			$results->makeVisible(array_intersect(
				$request->input('revealing'),
				$this->revealable
			));
		}

		if (!$user->isType("admin"))
			return $results->each(function($result) {
				if (method_exists($result, "hideFields"))
					$result->hideFields();
				collect($result->getRelations())->each(function($rel) {
					$rels = collect($rel);
					foreach ($rels as $rel) {
						if ($rel && method_exists($rel, "hideFields"))
							$rel->hideFields();
					}
				});
			});

		return $results->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $object = $this->model::create($request->all());

		return $request->ajax()
			? $object
			: back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
		$user = Auth::user();
		try {
			$result = $this->model::with($this->relationships)->findOrFail($id);
		} catch (\Exception $e) {
			$result = $this->model::with($this->relationships)->findOrFail(Hashids::decode($id)[0]);
		}

		if (!$user->isType("admin")) {
			if (method_exists($result, "hideFields"))
				$result->hideFields();
			collect($result->getRelations())->each(function($rel) {
				$rels = collect($rel);
				foreach ($rels as $rel) {
					if ($rel && method_exists($rel, "hideFields"))
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
    public function update(Request $request, $id) {
        $successful = $this->model::findOrFail($id)->update($request->all())
			? 'success'
			: 'error';

		return $request->ajax()
			? $successful
			: back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
		if ($this->model::destroy($id)) {
			if ($request->ajax())
				return "success";
			else
				return back();
		}
		else {
			if ($request->ajax())
				throw new \Exception("Problem deleting object");
			else
				return back()->with("error", "Problem deleting object");
		}
    }
}
