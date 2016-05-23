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
        "id" => "integer"
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

    public function sendEmail(){
        while(!$this->update_hash){
            $this->update_hash = str_random(40);
            $this->save();
            $this->fresh();
        }

        if(!$this->email)
            throw new \Exception("No email.");

        $email = $this->email;

        $data = [
            "lastName" => $this->last_name,
            "hash" => $this->update_hash
        ];
        Mail::send("emails.alumni-update", $data, function($message) use ($email){
            $message
                ->from("alumni@residentprogram.com", "MCW Anesthesiology Alumni")
                ->to($email)
                ->replyTo(config("app.admin_email"))
                ->subject("Please keep in touch!");
        });
    }
}
