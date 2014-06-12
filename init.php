<?php 
	//This page is included on virtually every page and is used to ensure a user is logged in and to initialize the mysql connection

	//The following line should be used for debugging purposes only, and should be removed or commented out during actual use (especially important for reporting pages)
	//ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	//error_reporting(0);
	
	//very simplistic means of making sure a user is logged in before displaying anything
	include_once("phpbbconf.php");
	if(empty($_SESSION["username"])){ 
		header("Location: index.php"); 
	}
	
	//initializes the mysql connection on each page
	$mysqli = new mysqli("localhost", "rpdbadmin", "imsdcnj239jcDKgpw34Fv1", "resprogdata");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
	}
?>
