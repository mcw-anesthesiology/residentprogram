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
	<form method="post" action="process_form.php">
		<h3 class="form-input">
			<div class='container-fluid'>
				<div class='row'>
					<div class='col-md-12'>
						<input type="text" id="formTitle" class="form-control input-lg" name="formTitle" placeholder="Form Title" required />
					</div>
				</div>
			</div>
		</h3>
		<div class='hr-question'></div>
		<div class="form">
		</div>
		<div id='footer'>
			<button type="button" class="btn btn-info" id="addQuestion">Add Question</button>
			<button type="submit" class="btn btn-success">Submit Form</button>
		</div>	
	</form>
	<br />
	
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script>
		var radioHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='radio' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='number' placeholder='Option Value' />" +
											"<input class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description' />" +
										"</div>";

		var textHtml = "<div class='col-md-10'>" +
										 "<textarea disabled>" +
										 "</textarea>" +
									 "</div>";
						
		var milestoneHtml = "<select class='form-control form-question-milestone' name=''>" +
													<?php
														while(!is_null($milestone)){
															echo "\"<option value='{$milestone["milestoneId"]}'>{$milestone["title"]}</option>\" +";
															$milestone = $milestones->fetch_assoc();
														}
													?>							
												"</select>";
							
		var competencyHtml = "<select class='form-control form-question-competency' name=''>" +
														<?php
															while(!is_null($competency)){
																echo "\"<option value='{$competency["competencyId"]}'>{$competency["title"]}</option>\" +";
																$competency = $competencies->fetch_assoc();
															}
													  ?>							
												 "</select>";

		var typeHtml = "<select class='form-control form-question-type' name='questionType'>" +
										 "<option value='radio'>Radio</option>" +
										 "<option value='text'>Text</option>" +
									 "</select>";

		var questionHtml = "<div class='container-fluid form-question'>" +
												"<div class='row' style='margin-top:5px;'>" +
													"<div class='col-md-12'>" +
														"<b>Question Text</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-12'>" +
														"<input type='text' class='form-input form-question-text form-control' name='questionText' placeholder='Question Text' required />" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row'>" +
													"<div class='col-md-4'>" +
														"<b>Question Milestone</b>" +
													"</div>" +
													"<div class='col-md-4'>" +
														"<b>Question Competency</b>" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<b>Question Type</b>" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<b>Question Weight</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-4'>" +
														milestoneHtml +
													"</div>" +
													"<div class='col-md-4'>" +
														competencyHtml +
													"</div>" +
													"<div class='col-md-2'>" +
														typeHtml +
													"</div>" +
													"<div class='col-md-2'>" +
														"<input class='form-input form-control form-question-weight' type='number' min='0' max='200' value='100' step='1' />" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row form-options'>" +
													radioHtml +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row'>" +
													"<div class='col-md-2'>" +
														"<button class='form-question-delete btn btn-danger' style='margin-bottom:5px;'>" +
															"Delete Question" +
														"</button>" +
													"</div>" +
												"</div>" +
											"</div>" +
											"<div class='hr-question'></div>";
		
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
				if($(this).parent().next().length == 0){
					$(this).parent().parent().append(radioHtml);
				}
			}
			else{
				if(($(this).parent().prev().find(".form-option-value").val() == "" || $(this).parent().next().find(".form-option-value").val() == "") && $(this).parent().find(".form-option-text").val() == "" && $(this).parent().find(".form-option-description").val() == ""){
					$(this).parent().remove();
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
		
		$("form").submit(checkForm);
		
		function checkForm(){
			var validForm = true;
			var alertText = "";
			if($("#formTitle").val() === ""){
				$("#formTitle").focus();
				alertText = "Please enter a title for the evaluation form.";
				validForm = false;
			}
			$(".form-question-text").each(function(){
				if($(this).val() === ""){
					alertText = "Please enter a question text for each question.";
					validForm = false;
				}
			});
			$(".form-option-value").each(function(){
				var name = $(this).attr("name");
				if($(this).val() === "" && ($(this).siblings(".form-option-text").val() !== "" || $(this).siblings(".form-option-description").val() !== "")){
					$(this).focus();
					alertText = "An option cannot be submitted without a value. Please either assign a value or remove the option text and description for the selected option.";
					validForm = false;
				}
			});
			if(!validForm)
				alert(alertText);
			
			return validForm;
		}
    </script>
  </body>
</html>
