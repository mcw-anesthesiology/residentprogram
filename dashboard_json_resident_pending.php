<?php
	session_start();
	include "init.php";
	if($_SESSION["type"] == "resident"){
		$result = "";
		$requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId lef join users on requests.faculty=users.username where requests.resident='{$_SESSION["username"]}' and requests.status='pending' order by requestId");
		$result .= "{\"data\":[";

		foreach($requests as $request){
			$result .= "[";
			$requestDate = new DateTime($requestRow["requestDate"]);
			$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
			$result .= "\"<a href='view_specific.php?request={$request["requestId"]}'>{$request["requestId"]}</a>\",";
			$result .= "\"{$request["firstName"]} {$request["lastName"]}\",";
			$result .= "\"{$request["title"]}\",";
			$result .= "\"".$requestDate->format("Y-m-d H:i:s")."\",";
			if($request["requestedBy"] == $_SESSION["username"])
				$result .= "\"<button class='cancelEvalResident btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-resident-modal-sm' data-id='{$request["requestId"]}'><span class='glyphicon glyphicon-remove'></span> Cancel</button>\",";
			else
				$result .= "\"\",";
			$result .= "],";
		}
		$result = substr($result, 0, -1);
		$result .= "]}";
		echo $result;
	}
?>
