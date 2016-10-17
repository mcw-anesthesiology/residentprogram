@extends("app")

@section("body")
	<h2 class="sub-header">Form Builder</h2>
	<form id="evaluation-form" method="POST" action="/forms">
		{!! csrf_field() !!}
		<div id="form-builder"></div>
	</form>
	<br />
@stop

@section("script")
	<script src="/js/form-builder.js"></script>
	<script>
		var formContents = {!! $formContents or '""' !!};
		if(formContents){
			FORM_BUILDER_VM.oldFormContents = formContents;
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
