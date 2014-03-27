<?php
	session_start();
	require "init.php";
	
	foreach ($_POST as $key => $value){
		echo "<p>".$key." ".$value."</p>";
	}
?>
