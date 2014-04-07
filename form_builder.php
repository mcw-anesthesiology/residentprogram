<?php 
	//TODO: Make copying and modifying an existing evaluation form work when creating a new form
	
	session_start(); 
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	if(isset($_POST["evaluationForm"])){
		$evaluationForm = $_POST["evaluationForm"];
	}
	else{
		$evaluationForm = "";
	}
	
	$milestones = $mysqli->query("select * from milestones;");
	$milestone = $milestones->fetch_assoc();
	$competencies = $mysqli->query("select * from competencies;");
	$competency = $competencies->fetch_assoc();
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
	<h2 class="sub-header">Form Builder</h2>
	<form method="post" action="process_form.php" onsubmit="return checkForm()">
		<h3 class="form-input"><input type="text" id="formTitle" class="form-control input-lg" name="formTitle" placeholder="Form Title" required /></h3>
		<div class="form">
		</div>
		<button type="button" class="btn btn-info" id="addQuestion">Add Question</button>
		<button type="submit" class="btn btn-success">Submit Form</button>
	</form>
	<br />
	
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script>
		var radioHtml = "<td class='tdRdoBtn'>" +
							"<label>" +
								"<input type='radio' disabled/><br />" +
								"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' /><br />" +
								"<input class='form-input form-option form-option-value form-control' type='number' placeholder='Option Value' /><br />" +
								"<input class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Option Description' />" +
							"</label>" +
						"</td>";

		var textHtml = "<td>" +
							"<textarea disabled>" +
							"</textarea>" +
						"</td>";
						
		var milestoneHtml = "<label>Question Milestone</label>" +
							"<select class='form-control form-question-milestone' name=''>" +
								<?php
									while(!is_null($milestone)){
										echo "\"<option value='{$milestone["milestoneId"]}'>{$milestone["title"]}</option>\" +";
										$milestone = $milestones->fetch_assoc();
									}
								?>							
							"</select>";
							
		var competencyHtml = "<label>Question Competency</label>" + 
							"<select class='form-control form-question-competency' name=''>" +
								<?php
									while(!is_null($competency)){
										echo "\"<option value='{$competency["competencyId"]}'>{$competency["title"]}</option>\" +";
										$competency = $competencies->fetch_assoc();
									}
								?>							
							"</select>";

		var questionHtml = "<table class='table table-striped form-input form-question'>" +
								"<tr>" +
									"<td colspan='10'>" +
										"<label class='form-question-name' for='questionText'></label>" +
										"<input type='text' class='form-input form-question-text form-control' name='questionText' placeholder='Question Text' required />" +
									"</td>" +
								"</tr>" +
								"<tr>" +
									"<td colspan='10'>" +
										milestoneHtml +
									"</td>" +
								"</tr>"+
								"<tr>" +
									"<td colspan='10'>" +
										competencyHtml +
									"</td>" +
								"</tr>"+
								"<tr>" +
									"<td colspan='10'>" +
										"<label>Question Weight</label>" +
										"<input class='form-input form-control form-question-weight' type='number' min='0' max='200' value='100' />" +
									"</td>" +
								"</tr>"+								
								"<tr>" +
									"<td colspan='10'>" +
										"<label for='questionType'>Question Type:</label>" +
            							"<select class='form-control form-question-type' name='questionType'>" +
											"<option value='radio'>Radio</option>" +
											"<option value='text'>Text</option>" +
										"</select>" +
									"</td>" +
								"</tr>" +
								"<tr class='form-options'>"+radioHtml+"</tr>" +
								"<tr>" +
									"<td colspan='10'>" +
										"<button class='form-question-delete btn btn-danger'>Delete Question</button>" +
									"</td>" +
								"</tr>" +
							"</table>";
		
		$(document).ready(function(){
			addQuestion();
		});
		
		$(".form").on("change", ".form-question-type", function(){
			if($(this).val() === "radio"){
				$(this).parent().parent().next(".form-options").html(radioHtml);
			}
			else if($(this).val() === "text"){
				$(this).parent().parent().next(".form-options").html(textHtml);
				var questionId = $(this).parents(".form-question").attr("id");
				$(this).parents(".form-question").find("textarea").attr("name", questionId+":textResponse");
			}
		});
		
		$(".form").on("change", ".form-option-value", function(){
			if($(this).val() != ""){
				if($(this).parent().parent().next().length == 0){
					$(this).parent().parent().parent().append(radioHtml);
				}
			}
			else{
				if($(this).parent().parent().prev().find(".form-option-value").val() == "" || $(this).parent().parent().next().find(".form-option-value").val() == ""){
					$(this).parent().parent().remove();
				}
			}
			
			var questionId = $(this).parents(".form-question").attr("id");
			var optionValue = $(this).val();
			
			$(this).parent().find(".form-option-text").attr("name", questionId+":"+optionValue);
			$(this).parent().find(".form-option-description").attr("name", questionId+":"+optionValue+":description");
			
		});
		
		$(".form").on("click", ".form-question-delete", function(){
			$(this).parents(".form-question").remove();
		});

		$("#addQuestion").click(function(){
			addQuestion();
		});
		
		function addQuestion(){
			if($(".form").children().length == 0){
				questionId = "q1";
			}
			else{
				var questionId = $(".form").children().last().attr("id");
				var questionIdNum = parseFloat(questionId.substring(1));
				questionIdNum++;
				questionId = questionId.substring(0, 1)+questionIdNum;
			}
			
			$(".form").append(questionHtml);
			$(".form").children().last().attr("id", questionId);
			$(".form").children().last().find(".form-question-name").html(questionId.toUpperCase()+": ");
			$(".form").children().last().find(".form-question-text").attr("name", questionId+":name");
			$(".form").children().last().find(".form-question-type").attr("name", questionId+":type");
			$(".form").children().last().find(".form-question-milestone").attr("name", questionId+":milestone");
			$(".form").children().last().find(".form-question-competency").attr("name", questionId+":competency");
			$(".form").children().last().find(".form-question-weight").attr("name", questionId+":weight");
		}
		
		function checkForm(){
			
		}
    </script>
  </body>
</html>
