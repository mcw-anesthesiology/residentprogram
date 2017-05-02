<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Setting;

class SettingController extends Controller
{
	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->only([
			'update',
			'destroy'
		]);
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Setting::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $value = Setting::get($id);

		if (empty($value))
			return response()->json([
				'status' => 'error'
			], 404);

		return $value;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Setting::set($id, $request->input('value'));
		Setting::save();

		return response()->json([
			'status' => 'success'
		]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Setting::forget($id);
    }
}
