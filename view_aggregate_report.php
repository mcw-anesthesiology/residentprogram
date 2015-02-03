<?php
	//This page displays aggregate reporting information for all residents. It contains a table at the upper portion of the screen giving numeric data in regards to resident averages and number of standard deviations from the mean of resident averages.
	//For each resident that has completed evaluations during the specified time period and training level, it contains two radar graphs below that, one for milestones and one for competencies in relation to all residents during the specified time period and training level.

	session_start();
	require "init.php";
	require "reporting.php";

	$startDate = $_POST["startDate"];
	$endDate = $_POST["endDate"];
	$trainingLevel = $_POST["trainingLevel"];



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

		.red{ background-color: red; }
		.yellow{ background-color: yellow; }
		.green{ background-color: green; }
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>

	<?php createReportTable($trainingLevel, $startDate, $endDate); ?>

	<div style="text-align:center;">
		<?php
			if(isset($_POST["graphs"]) && $_POST["graphs"] == "yes")
				drawAllGraphs($trainingLevel, $startDate, $endDate);
		?>
	</div>
	<?php
		include "scripts.html";
	?>
  </body>
</html>
