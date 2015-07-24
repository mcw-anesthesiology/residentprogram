<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class FileController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
    }

    public function getGraph($filename){
        $path = "app/graphs/".$filename;
        return response()->download(storage_path($path), null, [], null);
    }
}
