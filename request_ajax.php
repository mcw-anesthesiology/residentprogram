<?php
	session_start();
	include "init.php";
	$result .= "";

	$forms = $mysqli->query("select formId, title from forms where status='active' order by title");
	
	if($_SESSION["type"] == "admin" || $_SESSION["type"] == "faculty"){
		if(isset($_POST["block"]) && $_POST["block"] != "none" && $_SESSION["type"] == "faculty"){
			$residentsStmt = $mysqli->prepare("select username, firstName, lastName from users join block_assignments on block_assignments.user=users.username where users.type='resident' and users.status='active' and blockName=? and location in (select location from block_assignments where user=? and blockName=?)");
			$residentsStmt->bind_param("sss", $_POST["block"], $_SESSION["username"], $_POST["block"]);
		}
		else{
			$residentsStmt = $mysqli->prepare("select username, firstName, lastName from users where type='resident' and status='active' order by lastName;");
		}
		$residentsStmt->bind_result($residentUsername, $residentFirst, $residentLast);
		$residentsStmt->execute();
	  
              $result .= '<div class="form-group">';
                $result .= '<label for="resident">Resident/Fellow</label>';
                $result .= '<select class="form-control request-select" name="resident">';
					$result .= '<option value="-1">-- Select Resident --</option>';
						while($residentsStmt->fetch()){
							$result .= "<option value=\"{$residentUsername}\">{$residentLast}, {$residentFirst}</option>";
						}
                $result .= '</select>';
			$result .= '</div>';
		$residentsStmt->close();
  	}
	if($_SESSION["type"] != "faculty"){
		if(isset($_POST["block"]) && $_POST["block"] != "none" && $_SESSION["type"] == "resident"){
			$facultyStmt = $mysqli->prepare("select username, firstName, lastName from users join block_assignments on block_assignments.user=users.username where users.type='faculty' and users.status='active' and blockName=? and location in (select location from block_assignments where user=? and blockName=?)");
			$facultyStmt->bind_param("sss", $_POST["block"], $_SESSION["username"], $_POST["block"]);
		}
		else{
			$facultyStmt = $mysqli->prepare("select username, firstName, lastName from users where type='faculty' and status='active' order by lastName");
		}
		$facultyStmt->bind_result($facultyUsername, $facultyFirst, $facultyLast);
		$facultyStmt->execute();

              $result .= '<div class="form-group">';
                $result .= '<label for="facultyMember">Faculty Member</label>';
                $result .= '<select class="form-control request-select" name="faculty">';
					$result .= '<option value="-1">-- Select Faculty --</option>';
						while($facultyStmt->fetch()){
							$result .= "<option value=\"{$facultyUsername}\">{$facultyLast}, {$facultyFirst}</option>";
						}
                $result .= '</select>';
			  $result .= '</div>';
		$facultyStmt->close();
	}
              $result .= '<div class="form-group">';
                $result .= '<label for="evaluationForm">Evaluation Form</label>';
                $result .= '<select class="form-control request-select" name="evaluationForm">';
					$result .= '<option value="-1">-- Select Form --</option>';
						foreach($forms as $form){
							$result .= "<option value=\"{$form["formId"]}\">{$form["title"]}</option>";
						}
                $result .= '</select>';
              $result .= '</div>';
			  $result .= '<button type="submit" class="btn btn-default">Submit</button>';

echo $result;
