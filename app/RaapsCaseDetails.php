<?php

namespace App;

class RaapsCaseDetails extends CaseDetails
{
	// protected $anesthesiaAnalgesiaTypes = [
	//
	// ];
	//
	// protected $blockadeSites = [
	//
	// ];

	public function anesthesiaAnalgesiaTypes(){
		return $this->hasMany("App\AnesthesiaAnalgesiaType", "details_anesthesia_analgesia_types");
	}

    public function blockadeSites(){
		return $this->hasMany("App\BlockadeSite", "details_blockade_sites");
	}
}
