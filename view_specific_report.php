<?php
	//This page displays aggregate reporting information for a single resident. It contains a table at the upper portion of the screen giving basic information about the resident,
	//and contains two radar graphs below that, one for milestones and one for competencies in relation to all residents during the specified time period. 

	//TODO: Text responses after graphs
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
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<style>
		textarea{
			width:100%;
			resize: none;
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
		<?php drawIndividualGraphs($resident, $trainingLevel, $startDate, $endDate); ?>
	</div>
	
  </body>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/jquery.tablesorter.min.js"></script>
</html>
