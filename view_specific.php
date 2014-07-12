<?php 
	//This page is used to view an evaluation. If the evaluation has already been completed, it pulls saved response and textResponse information for the evaluation and displays the faculty input in read-only mode.
	//Otherwise, it simply displays the form's questions in read-only mode.

	//TODO: Make sure saved but not submitted evaluations aren't being grabbed for others to see
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
	
	if($_SESSION["username"] !== $request["resident"] && $_SESSION["username"] !== $request["faculty"] && $_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$requestDate = new DateTime($request["requestDate"]);
	$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
	$completeDate = new DateTime($request["completeDate"]);
	$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
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
                  <td><?= $completeDate->format("Y-m-d H:i:s"); ?></td>
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

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
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
