<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

use App\User;

class Advancement extends Model
{
    protected $table = "advancements";

	protected $fillable = [
		"user_id",
		"advanced_field",
		"advanced_value",
		"run_at"
	];

	protected $casts = [
		"id" => "integer",
		"user_id" => "integer",
		"complete" => "boolean",
		"successful" => "boolean"
	];

	protected $dates = [
		"run_at"
	];

	public function user(){
		return $this->hasOne("App\User", "user_id");
	}

	public function run(){
		if($this->complete)
			throw new \Exception("Advancement is already complete");
		if($this->run_at < Carbon::now())
			throw new \Exception("Cannot run an advancement scheduled for the future");

		$user = User::findOrFail($this->user_id);
		if(!array_key_exists($this->advanced_field, $user->toArray()))
			throw new \Exception("Field does not exist in user");
		$user->setAttribute($this->advanced_field, $this->advanced_value);
		$user->save();

		$this->complete = true;
		$this->successful = true;
		$this->save();
	}
}
