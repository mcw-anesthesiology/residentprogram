<?php
	

	session_start();
	require "init.php";
	$residents = $mysqli->query("select username, firstName, lastName from users where type='resident' and status='active' order by lastName");
	$faculty = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active' order by lastName");
	$forms = $mysqli->query("select formId, title from forms where status='active' order by title");

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php
			include "head.html";
		?>
	</head>
	<body>
		<?php
			include "header.php";
		?>
		<div class="container-fluid">
			<h2 class="sub-header">Schedule Request</h2>
			<form id="form" role="form" action="process_request.php" method="post">
				<div class="form-group">
					<label for="resident">Resident/Fellow</label>
					<select class="form-control request-select" name="resident" id="resident">
						<option value="-1">-- Select Resident --</option>
						<?php
							foreach($residents as $resident){
								echo "<option value=\"{$resident["username"]}\">{$resident["lastName"]}, {$resident["firstName"]}</option>";
							}
						?>
					</select>
				</div>
				<div class="form-group">
					<label for="faculty">Faculty</label>
					<select class="form-control request-select" name="faculty" id="faculty">
						<option value="-1">-- Select Faculty --</option>
						<?php
							foreach($faculty as $facultyMember){
								echo "<option value=\"{$facultyMember["username"]}\">{$facultyMember["lastName"]}, {$facultyMember["firstName"]}</option>";
							}
						?>						
					</select>
				</div>
				<div class="form-group">
					<label for="evaluationForm">Evaluation Form</label>
					<select class="form-control request-select" name="evaluationForm" id="evaluationForm">
						<?php
							foreach($forms as $form){
								echo "<option value=\"{$form["formId"]}\">{$form["title"]}</option>";
							}
						?>
					</select>
				</div>
				<div class="form-group">
					<label for="requestDate">Request Date</label>
					<input type="text" class="form-control datepicker" name="requestDate" id="requestDate">
				</div>
				<button type="button" class="btn btn-default" id="scheduleRequest">Schedule</button>
			</form>
		</div>
		<div class="table-responsive">
			<table class="table table-striped" id="scheduled-requests">
				<thead>
					<tr>
						<th>#</th>
						<th>Resident/Fellow</th>
						<th>Faculty</th>
						<th>Evaluation Form</th>
						<th>Request Date</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>

	<?php
		include "scripts.html";
	?>
	<script>
		var requestsTable = $("#scheduled-requests").DataTable({
			"ajax": "scheduled_requests_json.php",
			stateSave: true
		});
		$("#scheduleRequest").click(function(){
			var data = {};
			data.resident = $("#resident").val();
			data.faculty = $("#faculty").val();
			data.evaluationForm = $("#evaluationForm").val();
			data.requestDate = $("#requestDate").val();
			$.ajax({
				type: "post",
				url: "process_request.php",
				data: data,
				success: function(response){
					requestsTable.ajax.reload();
				}
			});
		});
	</script>
	</body>
</html>
