<?php
	session_start();
	require "init.php";

	$sql = "";

	if($_SESSION["type"] == "admin")
		$sql = "select firstName, lastName, username from users where type='resident' and status='active'";
	elseif($_SESSION["type"] == "resident")
		$sql = "select firstName, lastName, username from users where type='resident' and username='{$_SESSION["username"]}'";
	elseif($_SESSION["type"] == "faculty")
		$sql = "select firstName, lastName, username from users join mentorships on users.username=mentorships.resident where mentorships.faculty='{$_SESSION["username"]}' and users.status='active'";

	$residents = $mysqli->query($sql);

?>
<!DOCTYPE html>
<html>
	<head>
		<?php include "head.html" ?>
	</head>
	<body>
		<?php require "header.php" ?>
		<div class="container-fluid">
			<div class="form-group col-sm-6">
				<label for="startDate">Start Date</label><input type="date" id="startDate" class="form-control" />
			</div>
			<div class="form-group col-sm-6">
				<label for="endDate">End Date</label><input type="date" id="endDate" class="form-control" />
			</div>
			<div class="form-group col-sm-6">
				<label for="username">Resident</label>
				<select id="username" class="form-contol">
					<option value="all">All Residents</option>
					<?php
						foreach($residents as $resident){
							echo "<option value='{$resident["username"]}'>{$resident["lastName"]}, {$resident["firstName"]}</option";
						}	
					?>
				</select>
			</div>
			<div class="form-group col-sm-4">
				<label for="trainingLevel">Training Level</label>
				<select id="trainingLevel">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select>
			</div>
			<div class="form-group col-sm-2">
				<button type="button" id="getReport" class="btn">Get Report</button>
			</div>
			<div id="report">

			</div>
		</div>
		<?php include "scripts.html" ?>
		<script>
			$("#getReport").click(function(){
				var data = {};
				data.username = $("#username").val();
				data.startDate = $("#startDate").val();
				data.endDate = $("#endDate").val();
				data.trainingLevel = $("#trainingLevel").val();
				$.ajax({
					type: "post",
					url: "get_report.php",
					data: data,
					success: function(response){
						if(response == -1)
							$("#report").html("Error retrieving report");
						else
							$("#report").html(reponse);
					}
				});
			});
		</script>
	</body>
</html>
