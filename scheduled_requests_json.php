<?php
	session_start();
	include "init.php";
	if($_SESSION["type"] == "admin"){
		$result = "";
		$requests = $mysqli->query("select requestId, resident, faculty, requestDate, completeDate, requests.status, title, residentUsers.firstName as residentFirst, residentUsers.lastName as residentLast, facultyUsers.firstName as facultyFirst, facultyUsers.lastName as facultyLast from requests left join forms on requests.formId=forms.formId left join users residentUsers on resident=residentUsers.username left join users facultyUsers on faculty=facultyUsers.username where requests.requestDate>=NOW() order by requestId");
		$result .= "{\"data\":[";
		foreach($requests as $request){
			$result .= "[";
			$requestDate = new DateTime($request["requestDate"]);
			$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
			if(!is_null($request["completeDate"]) && $request["status"] == "complete"){
				$completeDate = new DateTime($request["completeDate"]);
				$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
				$completeDateText = $completeDate->format("d-m-Y g:i A");
			} else {
				$completeDateText = "";
			}

			$result .= "\"<a href='view_specific.php?request={$request["requestId"]}'>{$request["requestId"]}</a>\",";
			$result .= "\"{$request["residentFirst"]} {$request["residentLast"]}\",";
			$result .= "\"{$request["facultyFirst"]} {$request["facultyLast"]}\",";
			$result .= "\"{$request["title"]}\",";
			$result .= "\"".$requestDate->format("d-m-Y g:i A")."\",";

			$result .= "\"<span><button class='removeSchedule btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-remove-modal' data-id='{$request["requestId"]}'><span class='glyphicon glyphicon-remove'></span> Remove</button></span>\"";

			$result .= "],";
		}
		$result = substr($result, 0, -1);
		$result .= "]}";
		echo $result;
	}
?>
