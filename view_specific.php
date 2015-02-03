<?php
	//This page is used to view an evaluation. If the evaluation has already been completed, it pulls saved response and textResponse information for the evaluation and displays the faculty input in read-only mode.
	//Otherwise, it simply displays the form's questions in read-only mode.

	session_start();
	require "init.php";

	if(!isset($_GET["request"]))
		header("Location: dashboard.php");
	else
		$requestId = $_GET["request"];

	$form = $mysqli->query("select forms.formId, location from forms inner join requests on forms.formId=requests.formId where requestId='{$requestId}';")->fetch_assoc();
	$formLocation = $form["location"];
	$formId = $form["formId"];

	$request = $mysqli->query("select resident, faculty, requestDate, completeDate, requests.status, residentUsers.firstName as residentFirst, residentUsers.lastName as residentLast, facultyUsers.firstName as facultyFirst, facultyUsers.lastName as facultyLast from requests left join users as residentUsers on requests.resident=residentUsers.username left join users as facultyUsers on requests.faculty=facultyUsers.username where requestId='{$requestId}';")->fetch_assoc();
	$evaluation = $mysqli->query("select * from evaluations where requestId='{$requestId}';")->fetch_assoc();
	$mentor = false;
	if($_SESSION["type"] == "faculty"){
		if($mysqli->query("select faculty from mentorships where resident='{$request["resident"]}' and faculty='{$_SESSION["username"]}' and status='active';")->num_rows > 0)
			$mentor = true;
	}

	if($request["status"] === "complete"){
		$questionQuery = $mysqli->query("select `questionId`, `response` from `responses` where requestId='{$requestId}';");
		$questionRow = $questionQuery->fetch_assoc();
		while(!is_null($questionRow)){
			$questions[] = $questionRow["questionId"];
			$responses[] = $questionRow["response"];
			$questionRow = $questionQuery->fetch_assoc();
		}

		$textResponseQuery = $mysqli->query("select `questionId`, `response` from `textResponses` where requestId='{$requestId}';");
		$textResponseRow = $textResponseQuery->fetch_assoc();
		while(!is_null($textResponseRow)){
			$textQuestions[] = $textResponseRow["questionId"];
			$textResponses[] = $textResponseRow["response"];
			$textResponseRow = $textResponseQuery->fetch_assoc();
		}
	}

	if($_SESSION["username"] !== $request["resident"] && $_SESSION["username"] !== $request["faculty"] && $_SESSION["type"] !== "admin" && !$mentor){
		header("Location: dashboard.php");
	}

	$requestDate = new DateTime($request["requestDate"]);
	$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
	if(!is_null($request["completeDate"]) && $request["status"] == "complete"){
		$completeDate = new DateTime($request["completeDate"]);
		$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
		$completeDateText = $completeDate->format("Y-m-d H:i:s");
	}
	else{
		$completeDateText = "";
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
      .description{
		  background-color: #FFECCF;
		  padding: 5px;
	  }
    </style>
  </head>

  <body>

<?php include 'header.php'; ?>

     <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">View Evaluation</h2>
      </div>
        <div class="table-responsive">
        	<h4 class="sub-header">Currently Viewing</h4>
			<table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Resident</th>
                  <th>Faculty</th>
                  <th>Request Date</th>
                  <th>Complete Date</th>
                  <th>Status</th>
                  <th>Training Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><?= $requestId ?></td>
                  <td><?= $request["residentFirst"] ?> <?= $request["residentLast"] ?></td>
                  <td><?= $request["facultyFirst"] ?> <?= $request["facultyLast"] ?></td>
                  <td><?= $requestDate->format("Y-m-d H:i:s"); ?></td>
                  <td><?= $completeDateText ?></td>
                  <td><?= $request["status"] ?></td>
                  <td><?= $evaluation["currentTrainingLevel"] ?></td>
                </tr>
			  </tbody>
		  </table>
		  <br>
		  <h4 class="sub-header">Evaluation</h4>
			<div id="form">
				<?php require "form_reader.php"; ?>
			</div>
        </div>
    </div>

	<?php
		include "scripts.html";
	?>
    <script>
		$(document).ready(function(){
			<?php
				if(isset($responses)){
					for($i = 0; $i < count($responses); $i++){
						echo "$(\"input[name='{$questions[$i]}'][value='{$responses[$i]}']\").prop(\"checked\", true);";
					}
				}
				if(isset($textResponses)){
					for($i = 0; $i < count($textResponses); $i++){
						echo "$(\"textarea[name='{$textQuestions[$i]}']\").val(\"{$textResponses[$i]}\");";
					}
				}
			?>
			$("#form input").prop("disabled", true);
			$("#form textarea").prop("disabled", true);
		});

		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			$("."+questionName).toggle();
		});
    </script>
  </body>
</html>
