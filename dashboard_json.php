<?php
	session_start();
	include "init.php";
	if($_SESSION["type"] == "resident"){
		$result = "";
		
		$result .= "{\"data\":[";

		foreach($requests as $request){
			$result .= "[";
			
			$result .= "],";
		}
		$result = substr($result, 0, -1);
		$result .= "]}";
		echo $result;
	}
?>
