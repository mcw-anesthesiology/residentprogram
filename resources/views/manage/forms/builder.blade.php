@extends("app")

@section("body")
	<h2 class="sub-header">Form Builder</h2>
	<form id="evaluation-form" method="POST" action="/forms">
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
							<option value="self-resident">Resident/Intern (self)</option>
							<option value="fellow">Fellow</option>
							<option value="self-fellow">Fellow (self)</option>
							<option value="faculty">Faculty</option>
							<option value="staff">Staff</option>
						</select>
					</div>
				</div>
			</div>
		<div class="form">
		</div>
		<div id='footer'>
			<button type="button" class="btn btn-default" id="add-instruction-block">Add instruction block</button>
			<button type="button" class="btn btn-info" id="addQuestion">Add Question</button>
			<button type="submit" class="btn btn-success">Submit Form</button>
		</div>
	</form>
	<br />
@stop

@section("script")
	<script>
		var customQuestionOptions = []; // TODO: form for this
		var radioHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='radio' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='number' placeholder='Option Value' />" +
											"<textarea class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description'></textarea>" +
										"</div>";

		var radioNonNumericHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='radio' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='text' placeholder='Option Value' />" +
											"<textarea class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description'></textarea>" +
										"</div>";

		var textHtml = "<div class='col-sm-12'>" +
										 "<textarea class='form-control' placeholder='Text response' disabled></textarea>" +
									 "</div>";

		var numberHtml = "<div class='col-md-8' ctr-contents tdRdoBtn'>" +
								"<input type='number' class='form-control' placeholder='Number' disabled />" +
								"</div>";

		var checkboxHtml = "<div class='col-md-2 ctr-contents tdRdoBtn'>" +
											"<input type='checkbox' disabled/>" +
											"<input class='form-input form-option form-option-text form-control' placeholder='Option Text' />" +
											"<input class='form-input form-option form-option-value form-control' type='text' placeholder='Option Value' />" +
											"<textarea class='form-input form-option form-option-description form-control' type='text' placeholder='Hover Description'></textarea>" +
										"</div>";

		var milestoneOptionsHtml =
									@foreach($milestoneGroups as $groupLabel => $milestoneGroup)
										"<optgroup label='{{ $groupLabel }}'>" +
										@foreach($milestoneGroup as $milestone)
											"<option value='{{ $milestone->id }}'>{{ $milestone->title }}</option>" +
										@endforeach
										"</optgroup>" +
									@endforeach
									"";

		var milestoneHtml = 	"<select multiple class='form-control form-question-milestone' name='' placeholder='Milestone(s)'>" +
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
										 "<option value='checkbox'>Checkbox</option>" +
									 "</select>";

		var questionHtml = "<div class='container-fluid form-question form-block'>" +
												"<div class='row' style='margin-top:5px;'>" +
													"<div class='col-md-9'>" +
														"<b>Question Text</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-6'>" +
														"<input type='text' class='form-input form-question-text form-control' name='questionText' placeholder='Question Text' required />" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<button class='form-question-standard-options btn btn-info' type='button'>Standard Options</button>" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<button class='form-question-milestone-level-options btn btn-info' type='button'>Milestone Options</button>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<button class='form-question-custom-options btn btn-info' type='button'>" +
															"Custom" +
														"</button>" +
													"</div>" +
													"<div class='col-md-1'>" +
														"<button class='form-block-delete btn btn-danger del-btn' type='button'>" +
															"Delete" +
														"</button>" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row'>" +
													"<div class='col-md-6'>" +
														"<b class='milestone-competency-label'>Question Milestones</b>" +
													"</div>" +
													"<div class='col-md-3'>" +
														"<b class='milestone-competency-label'>Question Competency</b>" +
													"</div>" +
													"<div class='col-md-2'>" +
														"<b>Question Type</b>" +
													"</div>" +
													// "<div class='col-md-1'>" +
													// 	"<b>Weight</b>" +
													// "</div>" +
													"<div class='col-md-1'>" +
														"<b>Required</b>" +
													"</div>" +
												"</div>" +
												"<div class='row'>" +
													"<div class='col-md-6'>" +
														milestoneHtml +
													"</div>" +
													"<div class='col-md-3'>" +
														competencyHtml +
													"</div>" +
													"<div class='col-md-2'>" +
														typeHtml +
														"<input type='hidden' class='form-question-weight' value='100' />" +
													"</div>" +
													// No one was using this anyway
													// "<div class='col-md-1'>" +
													// 	"<input type='number' class='form-input form-control form-question-weight' min='0' max='200' value='100' step='5' />" +
													// "</div>" +
													"<div class='col-md-1'>" +
														"<input type='checkbox' class='form-control form-question-required' name='' value='required' />" +
													"</div>" +
												"</div>" +
												"<div class='hr-question'></div>" +
												"<div class='row form-options' style='margin-bottom:5px;'>" +
													radioHtml +
												"</div>" +
											"</div>";

		var instructionBlockHtml = "<div class='container-fluid form-instruction-block form-block'>" +
										"<div class='row'>" +
											"<div class='col-md-10'>" +
												"<label>Instruction block</label> <small>Supports <a href='http://daringfireball.net/projects/markdown/basics' target='_blank'>markdown</a> (except inline HTML)</small>" +
												"<textarea class='form-control form-instruction-text' required></textarea>" +
											"</div>" +
											"<div class='col-md-1 col-md-offset-1'>" +
												"<button class='form-block-delete btn btn-danger del-btn' type='button'>Delete</button>" +
											"</div>" +
										"</div>" +
									"</div>";

		$(document).ready(function(){
			addQuestion();
		});

		$("#form-type").change(function(){
			var type = $(this).val();
			if(["resident", "self-resident", "fellow", "self-fellow"].indexOf(type) == -1){
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
			var milestoneCompetencyFields = [
				".form-question-milestone",
				".form-question-milestone-2",
				".form-question-competency"
			];

			var formQuestion = $(this).parents(".form-question");
			var questionId = formQuestion.attr("id");

			enableFields(formQuestion, milestoneCompetencyFields);

			if($(this).val() === "radio"){
				formQuestion.find(".form-options").html(radioHtml);
			}
			else if($(this).val() === "radiononnumeric"){
				formQuestion.find(".form-options").html(radioNonNumericHtml);
			}
			else if($(this).val() === "checkbox"){
				formQuestion.find(".form-options").html(checkboxHtml);
			}
			else if($(this).val() === "text"){
				formQuestion.find(".form-options").html(textHtml);
				formQuestion.find("textarea").attr("name", questionId+":textResponse");
				disableFields(formQuestion, milestoneCompetencyFields);
			}
			else if($(this).val() === "number"){
				formQuestion.find(".form-options").html(numberHtml);
				formQuestion.find(".form-options :input[type='number']").attr("name", questionId+":numberResponse");
			}
		});

		function disableFields(formQuestion, fields, disabled){
			disabled = typeof disabled !== "undefined" ? disabled : true;

			for(var i = 0; i < fields.length; i++){
				formQuestion.find(fields[i]).prop("disabled", disabled);
			}
		}

		function enableFields(formQuestion, fields){
			disableFields(formQuestion, fields, false);
		}

		$(".form").on("change", ".form-option-value", function(){
		//Adds input boxes for a new option when giving the current option a numeric value
			if($(this).val() != ""){
				if($(this).parent().next().length === 0){
					if($(".form-question-type").val() === "radio")
						$(this).parent().parent().append(radioHtml);
					else if($(".form-question-type").val() === "radiononnumeric")
						$(this).parent().parent().append(radioNonNumericHtml);
					else if($(".form-question-type").val() === "checkbox")
						$(this).parent().parent().append(checkboxHtml);
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

		$(".form").on("click", ".form-block-delete", function(){
		// Removes the current block
			$(this).parents(".form-block").remove();
		});

		$(".form").on("click", ".form-question-milestone-level-options", function(){
			var milestoneId = $(this).parents(".form-question").find(".form-question-milestone").val();
			var questionType = $(this).parents(".form-question").find(".form-question-type").val();
			var formType = $("#form-type").val();
			var questionType = $(this).parents(".form-question").find(".form-question-type").val();
			var formOptions = $(this).parents(".form-question").find(".form-options");
			formOptions.html("");
			var formOption = "";

			$.get("/milestones/" + milestoneId).done(function(milestone){

				var options = [{value: 0, text: "Not yet " + milestone.levels[0].name}];
				for(var i = 0; i < milestone.levels.length; i++){
					var value = 2 * parseInt(milestone.levels[i].level_number, 10);
					options.push({value: value - 1, text: ""});
					options.push({value: value, text: milestone.levels[i].name, description: milestone.levels[i].description});
				}

				for(var i = 0; i < options.length; i++){
					if(questionType == "radio")
						formOption = formOptions.append(radioHtml).children().last();
					else if(questionType == "radiononnumeric")
						formOption = formOptions.append(radioNonNumericHtml).children().last();
					else if(questionType === "checkbox")
						formOption = formOptions.append(checkboxHtml).children().last();
					else
						return;
					formOption.find(".form-option-value").val(options[i].value);
					formOption.find(".form-option-text").val(options[i].text);
					if(options[i].description)
						formOption.find(".form-option-description").val(options[i].description);
					var questionId = formOption.parents(".form-question").attr("id");
					var optionNumber = formOption.parents(".form-options").children().length;
					formOption.find(".form-option-text").attr("name", questionId+":"+options[i].value+":"+optionNumber);
					formOption.find(".form-option-description").attr("name", questionId+":"+options[i].value+":description");
				}
			}).fail(function(){

			});
		});

		$(".form").on("click", ".form-question-custom-options", function(){
			if(customQuestionOptions.length === 0)
				return;
			var questionType = $(this).parents(".form-question").find(".form-question-type").val();
			var container = $(this).parents(".form-question").find(".form-options");
			container.empty();
			addFormOptions(customQuestionOptions, container, questionType);
		});

		$(".form").on("click", ".form-question-standard-options", function(){
			var formType = $("#form-type").val();
			var questionType = $(this).parents(".form-question").find(".form-question-type").val();
			var formOptions = $(this).parents(".form-question").find(".form-options");
			formOptions.html("");
			var formOption = "";
			var options;
			if(["resident", "self-resident"].indexOf(formType) !== -1){
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
			else if(["fellow", "self-fellow"].indexOf(formType) !== -1){
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

			addFormOptions(options, formOptions, questionType);
		});

		function addFormOptions(options, container, questionType){
			for(var i = 0; i < options.length; i++){
				if(questionType == "radio")
					formOption = container.append(radioHtml).children().last();
				else if(questionType == "radiononnumeric")
					formOption = container.append(radioNonNumericHtml).children().last();
				else if(questionType === "checkbox")
					formOption = container.append(checkboxHtml).children().last();
				else
					return;
				formOption.find(".form-option-value").val(options[i].value);
				formOption.find(".form-option-text").val(options[i].text);
				formOption.find(".form-option-description").val(options[i].description);
				var questionId = formOption.parents(".form-question").attr("id");
				var optionNumber = formOption.parents(".form-options").children().length;
				formOption.find(".form-option-text").attr("name", questionId+":"+options[i].value+":"+optionNumber);
				formOption.find(".form-option-description").attr("name", questionId+":"+options[i].value+":description");
			}
		}

		$("#addQuestion").click(function(){
			addQuestion();
		});

		function addQuestion(){
		//Adds a question to the end of the form
			var type = $("#form-type").val();
			var questionId;
			if($(".form").children(".form-question").length == 0){
				questionId = "q1";
			}
			else{
				questionId = $(".form").children(".form-question").last().attr("id");
				var questionIdNum = parseFloat(questionId.substring(1));
				questionIdNum++;
				questionId = questionId.substring(0, 1) + questionIdNum;
			}

			$(".form").append(questionHtml);

			var newQuestion = $(".form").children(".form-question").last();
			// Changes the input name attributes for the newly added question to correctly reflect its questionId
			newQuestion.attr("id", questionId);
			newQuestion.find(".form-question-name").html(questionId.toUpperCase()+": ");
			newQuestion.find(".form-question-text").attr("name", questionId+":name");
			newQuestion.find(".form-question-type").attr("name", questionId+":type");
			newQuestion.find(".form-question-milestone").attr("name", questionId+":milestone[]")
				.select2({
					tags: true,
					createTag: function(){
						return undefined;
					}
				});
			newQuestion.find(".form-question-competency").attr("name", questionId+":competency");
			newQuestion.find(".form-question-weight").attr("name", questionId+":weight");
			newQuestion.find(".form-question-required").attr("name", questionId+":required");

			if(["resident", "self-resident", "fellow", "self-fellow"].indexOf(type) === -1){
				$(".form-question-milestone").hide().prop("disabled", true);
				$(".form-question-milestone-2").hide().prop("disabled", true);
				$(".form-question-competency").hide().prop("disabled", true);
				$(".milestone-competency-label").hide();
				newQuestion.find(".form-question-type").val("radiononnumeric").change();
				if(type == "faculty")
					newQuestion.find(".form-question-required").prop("checked", true);
			}
		}

		$("#add-instruction-block").click(function(){
			var blockId;
			if($(".form").children(".form-instruction-block").length == 0){
				blockId = "i1";
			}
			else{
				blockId = $(".form").children(".form-instruction-block").last().attr("id");
				var blockIdNum = parseFloat(blockId.substring(1));
				blockIdNum++;
				blockId = blockId.substring(0, 1) + blockIdNum;
			}

			$(".form").append(instructionBlockHtml);
			var newBlock = $(".form").children(".form-instruction-block").last();
			newBlock.attr("id", blockId);
			newBlock.find(".form-instruction-text").attr("id", "form-instruction-text-" + blockId);
			newBlock.find("label").attr("for", "form-instruction-text-" + blockId);
			newBlock.find(".form-instruction-text").attr("name", blockId + ":instruction");
		});



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
			$(".form-question-description").each(function(){
				if($(this).val().trim() === ""){
					$(this).focus();
					alertText = "A description block must not be empty.";
					validForm = false;
				}
			});
			if(!validForm)
				alert(alertText);

			return validForm;
		}
	</script>
@stop
