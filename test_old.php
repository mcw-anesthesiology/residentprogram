<?php
	session_start();
	include "init.php";
	include "reporting.php";
	
	createReportTable("CA-1", "2014-04-01 00:00:00", "2014-04-30 23:59:59");
	drawIndividualGraphs("resident", "CA-1", "2014-04-01 00:00:00", "2014-04-30 23:59:59");
	
?>

