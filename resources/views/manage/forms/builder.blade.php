@extends("app")

@section("body")
	<h2 class="sub-header">Form Builder</h2>
	<form id="evaluation-form" method="post" action="#">
		{!! csrf_field() !!}
			<div class='container-fluid'>
				<div class='row'>
					<div class='col-md-8'>
						<input type="text" id="formTitle" class="form-control input-lg" name="formTitle" placeholder="Form Title" required />
					</div>
					<div class="col-md-4">
						<label for="form-type">Form type</label>
						<select class="form-control" id="form-type" name="form_type" style="margin-bottom: 5px;">
							<option value="resident">Resident/Intern</option>
							<option value="fellow">Fellow</option>
							<option value="faculty">Faculty</option>
							<option value="staff">Staff</option>
						</select>
					</div>
				</div>
			</div>
		<div class="form">
		</div>
		<div id='footer'>
			<button type="button" class="btn btn-info" id="addQuestion">Add Question</button>
			<button type="submit" class="btn btn-success">Submit Form</button>
		</div>
	</form>
	<br />
@stop

@section("script")
	<script>
		var radioHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='radio' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='number' placeholder='Option Value' />" +
											"<input class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description' />" +
										"</div>";

		var radioNonNumericHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='radio' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='text' placeholder='Option Value' />" +
											"<input class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description' />" +
										"</div>";

		var textHtml = "<div class='col-md-10'>" +
										 "<textarea disabled>" +
										 "</textarea>" +
									 "</div>";

		var numberHtml = "<div class='col-md-8' ctr-contents tdRdoBtn'>" +
								"<input type='number' placeholder='Number' disabled />" +
								"</div>";

		var milestoneOptionsHtml =
									@foreach($milestones as $milestone)
											"<option value='{{ $milestone->id }}'>{{ $milestone->title }}</option>" +
									@endforeach
									"";

		var milestoneHtml = 	"<select class='form-control form-question-milestone' name=''>" +
									milestoneOptionsHtml +
								"</select>";

		var secondMilestoneHtml = 	"<select class='form-control form-question-milestone-2' name=''>" +
										"<option value='-1'>(None)</option>" +
										milestoneOptionsHtml +
									"</select>";

		var competencyHtml = "<select class='form-control form-question-competency' name=''>" +
									@foreach($competencies as $competency)
										"<option value='{{ $competency->id }}'>{{ $competency->title }}</option>" +
									@endforeach
												 "</select>";

		var typeHtml = "<select class='form-control form-question-type' name='questionType'>" +
										 "<option value='radio'>Radio</option>" +
										 "<option value='text'>Text</option>" +
										 "<option value='radiononnumeric'>Radio (non-numeric)</option>" +
										 "<option value='number'>Number</option>" +
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
														"<b class='milestone-competency-label'>Question Milestone 1</b>" +
													"</div>" +
													"<div class='col-md-3'>" +
														"<b class='milestone-competency-label'>Question Milestone 2</b>" +
													"</div>" +
													"<div class='col-md-3'>" +
														"<b class='milestone-competency-label'>Question Competency</b>" +
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

		$("#form-type").change(function(){
			var type = $(this).val();
			if(["resident", "fellow"].indexOf(type) == -1){
				$(".form-question-milestone").hide().prop("disabled", true);
				$(".form-question-milestone-2").hide().prop("disabled", true);
				$(".form-question-competency").hide().prop("disabled", true);
				$(".form-question-type").val("radiononnumeric").change();
				$(".milestone-competency-label").hide();
				if(type == "faculty")
					$(".form-question-required").prop("checked", true);
			}
			else{
				$(".form-question-milestone").show().prop("disabled", false);
				$(".form-question-milestone-2").show().prop("disabled", false);
				$(".form-question-competency").show().prop("disabled", false);
				$(".milestone-competency-label").show();
			}
		});

		$(".form").on("change", ".form-question-type", function(){
		//Changes the radio options for a single textarea when selecting text, or vice versa when selecting radio
			if($(this).val() === "radio"){
				$(this).parents(".form-question").find(".form-options").html(radioHtml);
			}
			else if($(this).val() === "radiononnumeric"){
				$(this).parents(".form-question").find(".form-options").html(radioNonNumericHtml);
			}
			else if($(this).val() === "text"){
				$(this).parents(".form-question").find(".form-options").html(textHtml);
				var questionId = $(this).parents(".form-question").attr("id");
				$(this).parents(".form-question").find("textarea").attr("name", questionId+":textResponse");
			}
			else if($(this).val() === "number"){
				$(this).parents(".form-question").find(".form-options").html(numberHtml);
				var questionId = $(this).parents(".form-question").attr("id");
				$(this).parents(".form-question").find(".form-options :input[type='number']").attr("name", questionId+":numberResponse");
			}
		});

		$(".form").on("change", ".form-option-value", function(){
		//Adds input boxes for a new option when giving the current option a numeric value
			if($(this).val() != ""){
				if($(this).parent().next().length == 0){
					if($(".form-question-type").val() == "radio")
						$(this).parent().parent().append(radioHtml);
					else if($(".form-question-type").val() == "radiononnumeric")
						$(this).parent().parent().append(radioNonNumericHtml);
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
			var formType = $("#form-type").val();
			var questionType = $(this).parents(".form-question").find(".form-question-type").val();
			var formOptionText = "";
			var formOptions = $(this).parents(".form-question").find(".form-options");
			formOptions.html("");
			var formOption = "";
			var options;
			if(formType == "resident"){
				options = [
					{value: 0, text: "Not at CBY"},
					{value: 1, text: ""},
					{value: 2, text: "CBY"},
					{value: 3, text: ""},
					{value: 4, text: "CA-1"},
					{value: 5, text: ""},
					{value: 6, text: "CA-2"},
					{value: 7, text: ""},
					{value: 8, text: "CA-3"},
					{value: 9, text: ""},
					{value: 10, text: "Attending"}
				];
			}
			else if(formType == "fellow"){
				options = [
					{value: 0, text: "Not at fellowship level"},
					{value: 1, text: ""},
					{value: 2, text: "Fellow - 1"},
					{value: 3, text: ""},
					{value: 4, text: "Fellow - 2"},
					{value: 5, text: ""},
					{value: 6, text: "Fellow - 3"},
					{value: 7, text: ""},
					{value: 8, text: "Fellow - 4"},
					{value: 9, text: ""},
					{value: 10, text: "Fellow - 5"}
				];
			}
			else if(formType == "faculty" && questionType == "radiononnumeric"){
				options = [
					{value: "strongly-disagree", text: "Strongly Disagree"},
					{value: "disagree", text: "Disagree"},
					{value: "undecided", text: "Undecided"},
					{value: "agree", text: "Agree"},
					{value: "strongly-agree", text: "Strongly Agree"},
					{value: "n-a", text: "N/A"}
				];
			}

			for(var i = 0; i < options.length; i++){
				if(questionType == "radio")
					formOption = formOptions.append(radioHtml).children().last();
				else if(questionType == "radiononnumeric")
					formOption = formOptions.append(radioNonNumericHtml).children().last();
				formOption.find(".form-option-value").val(options[i].value);
				formOption.find(".form-option-text").val(options[i].text);
				var questionId = formOption.parents(".form-question").attr("id");
				var optionNumber = formOption.parents(".form-options").children().length;
				formOption.find(".form-option-text").attr("name", questionId+":"+options[i].value+":"+optionNumber);
				formOption.find(".form-option-description").attr("name", questionId+":"+options[i].value+":description");

			}
		});

		$("#addQuestion").click(function(){
			addQuestion();
		});

		function addQuestion(){
		//Adds a question to the end of the form
			var type = $("#form-type").val();
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

			var newQuestion = $(".form").children(".form-question").last();
			// Changes the input name attributes for the newly added question to correctly reflect its questionId
			newQuestion.attr("id", questionId);
			newQuestion.find(".form-question-name").html(questionId.toUpperCase()+": ");
			newQuestion.find(".form-question-text").attr("name", questionId+":name");
			newQuestion.find(".form-question-type").attr("name", questionId+":type");
			newQuestion.find(".form-question-milestone").attr("name", questionId+":milestone");
			newQuestion.find(".form-question-milestone-2").attr("name", questionId+":milestone2");
			newQuestion.find(".form-question-competency").attr("name", questionId+":competency");
			newQuestion.find(".form-question-weight").attr("name", questionId+":weight");
			newQuestion.find(".form-question-required").attr("name", questionId+":required");

			if(["resident", "fellow"].indexOf(type) === -1){
				$(".form-question-milestone").hide().prop("disabled", true);
				$(".form-question-milestone-2").hide().prop("disabled", true);
				$(".form-question-competency").hide().prop("disabled", true);
				$(".milestone-competency-label").hide();
				newQuestion.find(".form-question-type").val("radiononnumeric").change();
				if(type == "faculty")
					newQuestion.find(".form-question-required").prop("checked", true);
			}
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
@stop
