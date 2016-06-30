<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests;

class RestController extends Controller
{
	protected $relationships = [];
	protected $attributes = [];

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
        $query = $this->model::with(array_keys($request->intersect($this->relationships)));
			foreach($request->intersect($this->attributes) as $name => $value){
				if(is_array($value))
					$query->whereIn($name, $value);
				else
					$query->where($name, $value);
			}

		return $query->take($request->input("limit"), null)
			->orderBy("id", $request->input("order", "desc"))
			->get();
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
        return $this->model::with($this->relationships)->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $this->model::find($id)->update($request->all());

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
		if($this->model::destroy($id) == 1){
			if($request->ajax())
				return "success";
			else
				return back();
		}
		else {
			if($request->ajax())
				throw new Exception("Problem deleting object");
			else
				return back()->with("error", "Problem deleting object");
		}
    }
}
