<?php
	session_start();
	include "init.php";
	if($_SESSION["type"] == "resident"){
		$result = "";
		$requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId left join users on requests.faculty=users.username where resident='{$_SESSION["username"]}' and requests.status='complete' order by completeDate");
		$result .= "{\"data\":[";

		foreach($requests as $request){
			$result .= "[";
			$requestDate = new DateTime($request["requestDate"]);
			$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
			if(!is_null($request["completeDate"]) && $request["status"] == "complete"){
				$completeDate = new DateTime($request["completeDate"]);
				$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
				$completeDateText = $completeDate->format("Y-m-d H:i:s");
			} else{
				$completeDateText = "";
			}
			$result .= "\"<a href='view_specific.php?request={$request["requestId"]}'>{$request["requestId"]}</a>\",";
			$result .= "\"{$request["firstName"]} {$request["lastName"]}\",";
			$result .= "\"{$request["title"]}\",";
			$result .= "\"".$requestDate->format("Y-m-d H:i:s")."\",";
			$reuslt .= "\"{$completeDateText}\",";
			$result .= "],";
		}
		$result = substr($result, 0, -1);
		$result .= "]}";
		echo $result;
	}
?>
