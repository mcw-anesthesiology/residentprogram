<?php 
	session_start();
	require "init.php";
	
	
	$evaluationForm = htmlspecialchars($_POST["evaluationForm"]);
	
		
	if($_SESSION["type"] == "resident")
		$resident = htmlspecialchars($_SESSION["username"]);
	else
		$resident = htmlspecialchars($_POST["resident"]);
		
	if($_SESSION["type"] == "faculty")
		$faculty = htmlspecialchars($_SESSION["username"]);
	else
		$faculty = htmlspecialchars($_POST["faculty"]);
		
		
	 $ipaddress = "";
	 if ($_SERVER["HTTP_CLIENT_IP"])
		 $ipaddress = $_SERVER["HTTP_CLIENT_IP"];
	 else if($_SERVER["HTTP_X_FORWARDED_FOR"])
		 $ipaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
	 else if($_SERVER["HTTP_X_FORWARDED"])
		 $ipaddress = $_SERVER["HTTP_X_FORWARDED"];
	 else if($_SERVER["HTTP_FORWARDED_FOR"])
		 $ipaddress = $_SERVER["HTTP_FORWARDED_FOR"];
	 else if($_SERVER["HTTP_FORWARDED"])
		 $ipaddress = $_SERVER["HTTP_FORWARDED"];
	 else if($_SERVER["REMOTE_ADDR"])
		 $ipaddress = $_SERVER["REMOTE_ADDR"];
	 else
		 $ipaddress = "UNKNOWN";
		 
	$requestDate = date("Y-m-d H:i:s");
	
	//TODO: Change to paramatarized
	$mysqli->query("insert into `requests` (formId, resident, faculty, requestedBy, status, requestDate, ipAddress) values ('{$evaluationForm}', '{$resident}', '{$faculty}', '{$_SESSION["username"]}', 'pending', '{$requestDate}', '{$ipaddress}');");
	$requestId = $mysqli->insert_id;
	
	if($_SESSION["type"] == "faculty"){
		header("Location: complete_specific.php?request={$requestId}");
	}
	else
		header("Location: dashboard.php");

?>
