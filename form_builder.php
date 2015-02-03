<?php
	//This page is used to create an evaluation form. It contains a single form that can contain an arbitrary number of questions.
	//Each question can be either type "radio" or "text" to ask for responses for multiple-choice questions and open-ended questions respectively.
	//Each radio question can have an arbitrary number of options. Each option must contain a numeric option value, and may contain an option text and an option description.
	//Option descriptions are hidden text that are displayed when hovering over options on a mouse-based device, and can also be seen on a touch-based device via a "Show Descriptions" button.
	//Each radio question must be associated with a milestone and a competency, and may be associated with a second milestone as well.
	//Each radio question must be given a weight value which is a percentage that weights questions more or less heavily based on the discretion of the administrator.
	//Weight defaults to 100%, and can be between 0 and 200.
	//Milestone, competency, and weight attributes mean absolutely nothing for a text question, even though the selection boxes are still there.

	//TODO: Make copying and modifying an existing evaluation form work when creating a new form
	//TODO: Remove weight/milestone/etc options for text questions

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

	$milestones = $mysqli->query("select * from milestones order by title;");
	$milestone = $milestones->fetch_assoc();
	$competencies = $mysqli->query("select * from competencies order by title;");
	$competency = $competencies->fetch_assoc();
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
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>
	<h2 class="sub-header">Form Builder</h2>
	<form id="evaluation-form" method="post" action="process_form.php">
		<h3 class="form-input">
			<div class='container-fluid'>
				<div class='row'>
					<div class='col-md-12'>
						<input type="text" id="formTitle" class="form-control input-lg" name="formTitle" placeholder="Form Title" required />
					</div>
				</div>
			</div>
		</h3>
		<div class="form">
		</div>
		<div id='footer'>
			<button type="button" class="btn btn-info" id="addQuestion">Add Question</button>
			<button type="submit" class="btn btn-success">Submit Form</button>
		</div>
	</form>
	<br />

	<?php
		include "scripts.html";
	?>
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

		var milestoneOptionsHtml = <?php
										while(!is_null($milestone)){
											echo "\"<option value='{$milestone["milestoneId"]}'>{$milestone["title"]}</option>\" +";
											$milestone = $milestones->fetch_assoc();
										}
									?>"";

		var milestoneHtml = 	"<select class='form-control form-question-milestone' name=''>" +
									milestoneOptionsHtml +
								"</select>";

		var secondMilestoneHtml = 	"<select class='form-control form-question-milestone-2' name=''>" +
										"<option value='-1'>(None)</option>" +
										milestoneOptionsHtml +
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
													"<div class='col-md-9'>" +
														"<b>Question Text</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-9'>" +
														"<input type='text' class='form-input form-question-text form-control' name='questionText' placeholder='Question Text' required />" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<button class='form-question-standard-options btn btn-info' type='button'>Standard Options</button>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<button class='form-question-delete btn btn-danger del-btn' type='button'>" +
															"Delete" +
														"</button>" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row'>" +
													"<div class='col-md-3'>" +
														"<b>Question Milestone 1</b>" +
													"</div>" +
													"<div class='col-md-3'>" +
														"<b>Question Milestone 2</b>" +
													"</div>" +
													"<div class='col-md-3'>" +
														"<b>Question Competency</b>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<b>Question Type</b>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<b>Weight</b>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<b>Required</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-3'>" +
														milestoneHtml +
													"</div>" +
													"<div class='col-md-3'>" +
														secondMilestoneHtml +
													"</div>" +
													"<div class='col-md-3'>" +
														competencyHtml +
													"</div>" +
													"<div class='col-md-1'>" +
														typeHtml +
													"</div>" +
													"<div class='col-md-1'>" +
														"<input class='form-input form-control form-question-weight' type='number' min='0' max='200' value='100' step='1' />" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<input type='checkbox' class='form-control form-question-required' name='' value='required' />" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row form-options' style='margin-bottom:5px;'>" +
													radioHtml +
												"</div>" +
											"</div>";

		$(document).ready(function(){
			addQuestion();
		});

		$(".form").on("change", ".form-question-type", function(){
		//Changes the radio options for a single textarea when selecting text, or vice versa when selecting radio
			if($(this).val() === "radio"){
				$(this).parents(".form-question").find(".form-options").html(radioHtml);
			}
			else if($(this).val() === "text"){
				$(this).parents(".form-question").find(".form-options").html(textHtml);
				var questionId = $(this).parents(".form-question").attr("id");
				$(this).parents(".form-question").find("textarea").attr("name", questionId+":textResponse");
			}
		});

		$(".form").on("change", ".form-option-value", function(){
		//Adds input boxes for a new option when giving the current option a numeric value
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
			var optionNumber = $(this).parents(".form-options").children().length;

			$(this).parent().find(".form-option-text").attr("name", questionId+":"+optionValue+":"+optionNumber);
			$(this).parent().find(".form-option-description").attr("name", questionId+":"+optionValue+":description");

		});

		$(".form").on("click", ".form-question-delete", function(){
		//Removes the selected question
			$(this).parents(".form-question").remove();
		});

		$(".form").on("click", ".form-question-standard-options", function(){
			var formOptionText = "";
			var formOptions = $(this).parents(".form-question").find(".form-options");
			formOptions.html("");
			var formOption = "";
			for(formOptionValue = 0; formOptionValue <= 10; formOptionValue++){
				formOption = formOptions.append(radioHtml).children().last();
				formOption.find(".form-option-value").val(formOptionValue);

				if(formOptionValue%2 == 0){
					if(formOptionValue == 0){
						formOptionText = "Not at PGY-1";
						formOption.find(".form-option-description").val("Not at PGY-1");
					}
					else if(formOptionValue == 2){
						formOptionText = "PGY-1";
					}
					else if(formOptionValue == 4){
						formOptionText = "CA-1";
					}
					else if(formOptionValue == 6){
						formOptionText = "CA-2";
					}
					else if(formOptionValue == 8){
						formOptionText = "CA-3";
					}
					else if(formOptionValue == 10){
						formOptionText = "Attending";
					}
					formOption.find(".form-option-text").val(formOptionText);
				}

				var questionId = formOption.parents(".form-question").attr("id");
				var optionNumber = formOption.parents(".form-options").children().length;

				formOption.find(".form-option-text").attr("name", questionId+":"+formOptionValue+":"+optionNumber);
				formOption.find(".form-option-description").attr("name", questionId+":"+formOptionValue+":description");

			}
		});

		$("#addQuestion").click(function(){
			addQuestion();
		});

		function addQuestion(){
		//Adds a question to the end of the form
			if($(".form").children().length == 0){
				questionId = "q1";
			}
			else{
				var questionId = $(".form").children(".form-question").last().attr("id");
				var questionIdNum = parseFloat(questionId.substring(1));
				questionIdNum++;
				questionId = questionId.substring(0, 1)+questionIdNum;
			}

			$(".form").append(questionHtml);

			// Changes the input name attributes for the newly added question to correctly reflect its questionId
			$(".form").children(".form-question").last().attr("id", questionId);
			$(".form").children(".form-question").last().find(".form-question-name").html(questionId.toUpperCase()+": ");
			$(".form").children(".form-question").last().find(".form-question-text").attr("name", questionId+":name");
			$(".form").children(".form-question").last().find(".form-question-type").attr("name", questionId+":type");
			$(".form").children(".form-question").last().find(".form-question-milestone").attr("name", questionId+":milestone");
			$(".form").children(".form-question").last().find(".form-question-milestone-2").attr("name", questionId+":milestone2");
			$(".form").children(".form-question").last().find(".form-question-competency").attr("name", questionId+":competency");
			$(".form").children(".form-question").last().find(".form-question-weight").attr("name", questionId+":weight");
			$(".form").children(".form-question").last().find(".form-question-required").attr("name", questionId+":required");
		}

		$("#evaluation-form").submit(checkForm);

		function checkForm(){
		// Checks to make sure that the form has a title, each question has a title, and each option has a value. Option text and option description are both optional.
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
