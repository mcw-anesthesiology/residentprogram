<?php
	//This page is used to request a new evaluation to be completed by a faculty member for a resident. It calls process_request.php once the user selects the proper faculty, resident, and form information and submits it.

	session_start();
	require "init.php";


	$forms = $mysqli->query("select `formId`, `title` from `forms` where `status`='active' order by title;"); //active status
	$formsRow = $forms->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
  </head>

  <body>

<?php include 'header.php'; ?>

    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Request Evaluation</h2>
            <form id="form" role="form" action="process_request.php" method="post">
<?php
  if($_SESSION["type"] == "admin" || $_SESSION["type"] == "faculty"){
	  $residents = $mysqli->query("select username, firstName, lastName from users where type='resident' and status='active' order by lastName;");
	  $residentRow = $residents->fetch_assoc();
?>
              <div class="form-group">
                <label for="resident">Resident</label>
                <select class="form-control request-select" name="resident">
					<option value="-1">-- Select Resident --</option>
					<?php
						while(!is_null($residentRow)){
							echo "<option value=\"{$residentRow["username"]}\">{$residentRow["lastName"]}, {$residentRow["firstName"]}</option>";
							$residentRow = $residents->fetch_assoc();
						}
					?>
                </select>
              </div>
<?php
  }
  if($_SESSION["type"] != "faculty"){
	$faculty = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active' order by lastName;");
	$facultyRow = $faculty->fetch_assoc();
?>
              <div class="form-group">
                <label for="facultyMember">Faculty Member</label>
                <select class="form-control request-select" name="faculty">
					<option value="-1">-- Select Faculty --</option>
					<?php
						while(!is_null($facultyRow)){
							echo "<option value=\"{$facultyRow["username"]}\">{$facultyRow["lastName"]}, {$facultyRow["firstName"]}</option>";
							$facultyRow = $faculty->fetch_assoc();
						}
					?>
                </select>
              </div>
<?php
	}
?>
              <div class="form-group">
                <label for="evaluationForm">Evaluation Form</label>
                <select class="form-control request-select" name="evaluationForm">
					<option value="-1">-- Select Form --</option>
					<?php
						while(!is_null($formsRow)){
							echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
							$formsRow = $forms->fetch_assoc();
						}
					?>
                </select>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
      </div>
    </div>

	<?php
		include "scripts.html";
	?>
    <script>
		function checkSelectValues(){
			var optionsSelected = true;
			$(".request-select").each(function(){
				if($(this).val() == -1 || $(this).val() == "-1"){
					optionsSelected = false;
				}
			});
			if(!optionsSelected){
				alert("Please complete all selections");
			}
			return optionsSelected;
		}

		$("#form").submit(checkSelectValues);
    </script>
  </body>
</html>
