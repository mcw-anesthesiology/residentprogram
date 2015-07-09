<?php

session_start();
require "init.php";

$yearsQuery = $mysqli->query("select DISTINCT(year) as year from block_assignments order by year desc");
foreach($yearsQuery as $year){
	$years[] = $year["year"];
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
<?php include "head.html"; ?>
	</head>
	<body>
<?php include "header.php"; ?>
		<div class="container-fluid">
			<form enctype="multipart/form-data" id="form" method="post" action="process_block.php">
				<div class="form-group">
					<label for="year">Year</label>
					<select class="form-control" name="year" id="year">
						<option value="new">New Year</option>
<?php
	foreach($years as $year){
		echo "<option value='{$year}'>{$year}</option>";
	}
?>
					</select>
				</div>
				<div class="form-group">
					<label for="new-year">New Year</label>
					<input type="text" class="form-control" name="newYear" id="new-year" />
				</div>
				<div class="form-group">
					<input type="hidden" name="MAX_FILE_SIZE" value="30000000" />
					<label for="schedule">Schedule</label>
					<input type="file" class="form-control" name="schedule" id="schedule" />
				</div>
				<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
		<div class="container-fluid">
			<hr />
		</div>
		<div class="container-fluid">
			<label for="selectYear">Year</label>
			<select class="form-control" id="selectYear">
<?php
	foreach($years as $year){
			echo "<option value='{$year}'>{$year}</option>";
	}
?>
			</select>
			<br />
			<div id="tableContainer">
			</div>
		</div>

<?php include "scripts.html"; ?>
		<script>
			function loadBlock(){
				var year = $("#selectYear").val();
				$.ajax({
					"url": "get_block_schedule.php",
					"method": "post",
					"data": "year="+year,
					"success": function(response){
						if(response != ""){
							$("#tableContainer").html(response);
							var table = $("#tableContainer .datatable").DataTable({
								paging: false,
								"scrollX": true,
								"scrollY": "500px",
								"scrollCollapse": true,
								stateSave: true	
							});
							new $.fn.DataTable.FixedColumns( table );
						}
					}
				});
			};

			$("#year").change(function(){
				if($(this).val() == "new"){
					$("#new-year").prop("disabled", false).show();
				}
				else{
					$("#new-year").val("").prop("disabled", true).hide();
				}
			});

			$("#selectYear").change(loadBlock);

			$(document).ready(loadBlock);
		</script>
	</body>
</html>
