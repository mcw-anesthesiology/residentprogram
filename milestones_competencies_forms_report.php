<?php
	//This page displays aggregate reporting information for a single resident. It contains a table at the upper portion of the screen giving basic information about the resident,
	//and contains two radar graphs below that, one for milestones and one for competencies in relation to all residents during the specified time period.

	session_start();
	require "init.php";
	require "reporting.php";


?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
	<style>
		.n { background-color: pink; }
		.y { background-color: lightgreen; }
		table {border-collapse:collapse;}
		tr {border: none;}
		td {border: solid 1px black;}
		th {padding: 10px;}
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>
	<?php drawEvaluationMilestoneCompetencyTable(); ?>

	<?php
		include "scripts.html";
	?>
  </body>
</html>
