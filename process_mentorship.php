<?php
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: index.php");
	}
	
	if(isset($_P
?>
