<?php 
	session_start(); 
	ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	if(empty($_SESSION["username"])){ 
		header("Location: index.php"); 
	}
	
	$mysqli = new mysqli("localhost", "mcw", "BobbyLite", "mcw");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
	}
	
	$faculty = $_POST["faculty"];
	$evaluationForm = $_POST["evaluationForm"];
	
	if($_SESSION["type"] == "admin")
		$resident = $_POST["resident"];
	else
		$resident = $_SESSION["username"];
		
		
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
	
	$mysqli->query("insert into `requests` (requestedBy, requestedTo, status, requestDate, ip) values ('{$resident}', '{$faculty}', 'active', '{$requestDate}', '{$ipaddress}');");

?>
