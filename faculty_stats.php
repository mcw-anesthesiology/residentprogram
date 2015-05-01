<?php

	session_start();

	if($_SESSION["type"] != "admin"){
		header("Location: dashboard.php");
	}
	require "init.php";

	$faculty = $mysqli->query("select firstName, lastName, username from users where type='faculty'");
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
	<div class="container-fluid">
		<div class="form-group col-sm-6">
			<label for="statsStartDate">Start Date</label><input type="date" id="statsStartDate" class="form-control" />
		</div>
		<div class="form-group col-sm-6">
			<label for="statsEndDate">End Date</label><input type="date" id="statsEndDate" class="form-control" />
		</div>
		<div class="form-group col-sm-8">
			<select id="username" class="form-control">
				<option value="all">All Faculty</option>
			<?php
				foreach($faculty as $facultyMember){
					echo "<option value='{$facultyMember["username"]}'>{$facultyMember["lastName"]}, {$facultyMember["firstName"]}</option>";
				}
			?>
			</select>
		</div>
		<div class="form-group col-sm-4">
			<button type="button" id="getStats" class="btn">Get Statistics</button>
		</div>
		<div id="stats">
		</div>
	</div>
	<?php
		include "scripts.html";
	?>
	<script>
		$("#getStats").click(function(){
			var username = $("#username").val();
			var startDate = $("#statsStartDate").val();
			var endDate = $("#statsEndDate").val();
			var type = "faculty";
			var data = {};
			data.username = username;
			data.startDate = startDate;
			data.endDate = endDate;
			data.type = type;
			$.ajax({
				type: "post",
				url: "get_stats.php",
				data: data,
				success: function(response){
					if(response == -1)
						$("#stats").html("Error retrieving statistics");
					else
						$("#stats").html(response);
				}
			});
		});
	</script>
  </body>
</html>
