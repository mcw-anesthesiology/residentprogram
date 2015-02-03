<?php
	//This page displays aggregate reporting information for a single resident. It contains a table at the upper portion of the screen giving basic information about the resident,
	//and contains two radar graphs below that, one for milestones and one for competencies in relation to all residents during the specified time period.

	session_start();
	require "init.php";
	require "reporting.php";

	$startDate = $_POST["startDate"];
	$endDate = $_POST["endDate"];
	$trainingLevel = $_POST["trainingLevel"];
	$resident = $_POST["resident"];

	if($stmt = $mysqli->prepare("select firstName, lastName, trainingLevel, createdDate from users where username=?;")){
		if($stmt->bind_param("s", $resident)){
			if($stmt->execute()){
				$stmt->bind_result($firstName, $lastName, $currentTrainingLevel, $createdDate);
				$stmt->fetch();
				$stmt->close();
			}
			else{
				print $stmt->error;
			}
		}
		else{
			print $stmt->error;
		}
	}
	else{
		print $mysqli->error;
	}


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
		td{
			padding: 10px;
		}
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>

	<table class="table">
		<thead>
			<tr>
				<td>Username</td>
				<td>First Name</td>
				<td>Last Name</td>
				<td>Current Training Level</td>
				<td>Created</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><?= $resident ?></td>
				<td><?= $firstName ?></td>
				<td><?= $lastName ?></td>
				<td><?= $currentTrainingLevel ?></td>
				<td><?= $createdDate ?></td>
			</tr>
		</tbody>
	</table>

	<div style="text-align:center;">
		<?php
			if(isset($_POST["graphs"]) && $_POST["graphs"] == "yes")
				drawIndividualGraphs($resident, $trainingLevel, $startDate, $endDate);
		?>
	</div>
	<br /><br />
	<h3 class="sub-header">Text Responses</h3>
	<div class="textResponses">
		<?php writeTextResponses($resident, $trainingLevel, $startDate, $endDate) ?>
	</div>

	<?php
		include "scripts.html";
	?>
  </body>
</html>
