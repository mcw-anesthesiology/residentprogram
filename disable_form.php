<?php
	session_start();
	require "init.php";
	
	$formId = $_POST["formId"];
	$mysqli->query("update forms set status='inactive' where formId='{$formId}';");
	header("Location: manage_forms.php");
?>
