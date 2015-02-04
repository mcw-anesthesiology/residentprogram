<?php

	session_start();

	if($_SESSION["type"] != "admin"){
		header("Location: dashboard.php");
	}
	require "init.php";
	include "reporting.php";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
	<?php
		include "head.html";
	?>
	<style>
		textarea{
			width:100%;
			resize: none;
		}
		span{
			margin-right: 10px;
		}
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>
	<?php
		facultyStats();
	?>

	<?php
		include "scripts.html";
	?>
  </body>
</html>
