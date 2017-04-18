<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Mail;

class Alum extends Model
{
	protected $table = "alumni";

	protected $fillable = [
		"last_name",
		"first_name",
		"email",
		"phone",
		"address",
		"address_2",
		"city",
		"state",
		"zip",
		"country",
		"employer",
		"graduation_date",
		"notes"
	];

	protected $casts = [
		"id" => "integer",
		"do_not_contact" => "boolean"
	];

	protected $dates = [
		"graduation_date"
	];

	protected $appends = [
		"full_name"
	];

	public function getFullNameAttribute(){
		return $this->last_name . ", " . $this->first_name;
	}

	public function generateHash(){
		while(!$this->update_hash){
			try {
				$this->update_hash = str_random(40);
				$this->save();
				$this->fresh();
			} catch(\Exception $e){

			}
		}

		return $this->update_hash;
	}

	public function sendEmail(){

		if(!$this->email)
			throw new \Swift_TransportException("No email.");

		if($this->do_not_contact)
			throw new \Swift_TransportException("Alum has requested to not be contacted.");

		$email = $this->email;

		if($this->last_name && $this->first_name)
			$name = $this->first_name . " " . $this->last_name;
		else
			$name = "MCW Anesthesiology Alum";

		$alumniUrl = url("alum/" . $this->update_hash);
		$subscriptionUrl = url("alum/" . $this->update_hash . "/subscription");

		$data = compact("name", "alumniUrl", "subscriptionUrl");
		Mail::send("emails.alumni-update", $data, function($message) use ($email){
			$message
				->from("alumni@residentprogram.com", "MCW Anesthesiology Alumni")
				->to($email)
				->replyTo(config("app.admin_email"))
				->subject("Please keep in touch!");
		});
	}
}
