<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class FileController extends Controller
{

    public function getGraph($filename) {
        $path = "app/graphs/".$filename;
        try{
            return response()->file(storage_path($path));
        }
        catch(\Exception $e){

        }
    }

    public function getPhoto($filename) {
        $path = "app/photos/".$filename;
        try{
            return response()->file(storage_path($path));
        }
        catch(\Exception $e){

        }
    }

	public function getSchema($schema) {
		$path = "assets/schemas/{$schema}";
		try {
			return response()->file(resource_path($path), ['Content-Type' => 'application/json']);
		} catch (\Exception $e) {

		}
	}
}
