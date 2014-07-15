<?php 
	//This page is used by a faculty member to complete an evaluation. It sets $formLocation which is used by form_reader.php to read the form's XML file and render the questions. 
	//If all questions are completed, sends form to process_completion.php to add the responses to the database.
	
	session_start(); 
	require "init.php";
	
	if($_SESSION["type"] !== "faculty"){ //makes sure it's a faculty member, as only faculty can complete evaluations
		header("Location: dashboard.php");
	}
	
	if(!isset($_GET["request"]))
		header("Location: dashboard.php");
	else
		$requestId = $_GET["request"];
	
	$request = $mysqli->query("select requestDate, faculty, requests.status as requestStatus, firstName, lastName, trainingLevel, photo from requests left join users on requests.resident=users.username where requestId='{$requestId}';")->fetch_assoc();
	$evaluation = $mysqli->query("select * from evaluations where requestId='{$requestId}';")->fetch_assoc();
	$form = $mysqli->query("select location from forms inner join requests on forms.formId=requests.formId where requestId='{$requestId}';")->fetch_assoc(); 
	$formLocation = $form["location"];
	
	if($_SESSION["username"] !== $request["faculty"]){ 
		header("Location: dashboard.php");
	}
	if($request["requestStatus"] !== "pending"){
		header("Location: view_specific.php?request={$requestId}");
	}
	
	$responsesQuery = $mysqli->query("select `questionId`, `response` from `responses` where requestId='{$requestId}';");
	$response = $responsesQuery->fetch_assoc();
	while(!is_null($response)){
		$questions[] = $response["questionId"];
		$responses[] = $response["response"];
		$response = $responsesQuery->fetch_assoc();
	}
	
	$textResponsesQuery = $mysqli->query("select `questionId`, `response` from `textResponses` where requestId='{$requestId}';");
	$textResponse = $textResponsesQuery->fetch_assoc();
	while(!is_null($textResponse)){
		$textQuestions[] = $textResponse["questionId"];
		$textResponses[] = $textResponse["response"];
		$textResponse = $textResponsesQuery->fetch_assoc();
	}
	
	$requestDate = new DateTime($request["requestDate"]);
	$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
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
      <h2 class="sub-header">Complete Evaluation</h2>
    </div>
    <div class="table-responsive">
      <h4 class="sub-header">Currently Completing</h4>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Resident</th>
              <th>Request Date</th>
              <th>Training Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><?= $requestId ?></td>
              <td><?= $request["firstName"] ?> <?= $request["lastName"] ?></td>
              <td><?= $requestDate->format("Y-m-d H:i:s"); ?></td>
              <td><?= $request["trainingLevel"] ?></td>
              <?php
					if(!is_null($request["photo"]) && $request["photo"] != ""){
						echo "<td><img src='{$request["photo"]}' width='150px'/></td>";
					}
              ?>
            </tr>         
          </tbody>
        </table>
        <br>
        <h4 class="sub-header">Evaluation</h4>
        <p style="text-align: center;"><b style="color: red;">*</b> : required</p>
      </div>
      <form id="evaluation" role="form" method="post" action="process_completion.php">
        <div class="table-responsive">
 		<?php require "form_reader.php"; ?>
 		</div>
        <button type="submit" name="requestId" value="<?= $requestId ?>" class="btn btn-default">Submit</button>
        <button type="submit" id="saveForm" name="requestIdSaved" value="<?= $requestId ?>" class="btn btn-default" formnovalidate>Save</button>
      </form>
      <br/>
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
		});
		
		var saveForm = false;
		$("#evaluation").submit(checkForm);
		
		function checkForm(event){
			//Checks the evaluation to make sure every question is answered before submitting the form
			if(saveForm)
				return true;
			
			var validForm = true;
			var alertText = "";
			$("input:radio").each(function(){
				var name = $(this).attr("name");
				if($(this).attr("required") == "required" && $("input:radio[name="+name+"]:checked").length == 0){
					$(this).focus();
					alertText = "Please complete each required question";
					validForm = false;
				}
			});
			$("textarea").each(function(){
				if($(this).attr("required") == "required" && this.value === ""){
					$(this).focus();
					alertText = "Please complete each required question";
					validForm = false;
				}
			});
			if(!validForm)
				alert(alertText);
			return validForm;
		}
		
		$(".toggleDescriptions").click(function(){
			//Used to display the radio button option descriptions for touch devices
			var questionName = $(this).data("id");
			$("."+questionName).toggle();
		});
		
		$("#saveForm").click(function(){
			saveForm = true;
		});
    </script>
  </body>
</html>
