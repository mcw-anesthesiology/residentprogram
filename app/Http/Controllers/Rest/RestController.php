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
        return $this->model::with(array_keys(array_only($request->all(), $this->relationships)))
			->where(array_only($request->all(), $this->attributes))
			->take($request->input("limit"), null)
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
		if($request->has("ajax") && $request->input("ajax"))
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $this->model::destroy($id);
    }
}
