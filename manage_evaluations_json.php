<?php
	session_start();
	include "init.php";
	if($_SESSION["type"] == "admin"){
		$result = "";
		$requests = $mysqli->query("select requestId, resident, faculty, requestDate, completeDate, requestedBy, requests.status, title, residentUsers.firstName as residentFirst, residentUsers.lastName as residentLast, facultyUsers.firstName as facultyFirst, facultyUsers.lastName as facultyLast, requestedByUsers.firstName as requestedByFirst, requestedByUsers.lastName as requestedByLast from requests left join forms on requests.formId=forms.formId left join users residentUsers on resident=residentUsers.username left join users facultyUsers on faculty=facultyUsers.username left join users requestedByUsers on requestedBy=requestedByUsers.username order by requestId");
		$result .= "{\"data\":[";

		foreach($requests as $request){
			$result .= "[";
			$requestDate = new DateTime($request["requestDate"]);
			$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
			if(!is_null($request["completeDate"]) && $request["status"] == "complete"){
				$completeDate = new DateTime($request["completeDate"]);
				$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
				$completeDateText = $completeDate->format("d-m-Y g:i A");
			} else{
				$completeDateText = "";
			}
			$result .= "\"<a href='view_specific.php?request={$request["requestId"]}'>{$request["requestId"]}</a>\",";
			$result .= "\"{$request["requestedByLast"]}, {$request["requestedByFirst"]}\",";
			$result .= "\"{$request["residentLast"]}, {$request["residentFirst"]}\",";
			$result .= "\"{$request["facultyLast"]}, {$request["facultyFirst"]}\",";
			$result .= "\"".$requestDate->format("d-m-Y g:i A")."\",";
			$result .= "\"{$completeDateText}\",";
			if($request["status"] == "complete"){
				$badge = "complete";
			} elseif($request["status"] == "pending"){
				$badge = "pending";
			} else{
				$badge = "disabled";
			}
			$result .= "\"<span class='badge badge-{$badge}>{$request["status"]}</span>\",";
			$result .= "\"";
			if($request["status"] == "disabled"){
				$result .= "<span><button class='enableEval btn btn-success btn-xs' data-id='{$request["requestId"]}'><span class='glyphicon glyphicon-ok'></span> Enable</button></span>";
			} else{
				$result .= "<span><button class='disableEval btn btn-danger btn-xs' data-id='{$request["requestId"]}'><span class='glyphicon glyphicon-remove'></span> Disable</button></span>";
			}
			$result .= "<span class='cancel'>";
			if($request["status"] == "pending"){
				$result .= "<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='{$request["requestId"]}'><span class='glyphicon glyphicon-remove'></span> Cancel</button>";
			}
			$result .= "</span>\"";
			$result .= "],";
		}
		$result = substr($result, 0, -1);
		$result .= "]}";
		echo $result;
	}
?>
