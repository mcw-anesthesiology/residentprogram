<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FacultyPeerForm extends Model
{
	use SoftDeletes;
	
    protected $table = 'faculty_peer_forms';
	
	protected $casts = [
		'id' => 'integer',
		'contents' => 'array'
	];
	
	protected $dates = [
		'created_at',
		'updated_at',
		'deleted_at'		
	];
	
	protected $userHidden = [
		'status',
		'created_at',
		'updated_at',
		'deleted_at'
	];
	
	public function evaluations() {
		return $this->hasMany('App\FacultyPeerEvaluation');
	}
	
	public function hideFields() {
		$this->addHidden($this->userHidden);
		
		return $this;
	}
}
