@extends("app")

@section("body")
	<div class="row">
		<h2 class="sub-header">View Evaluation</h2>
	</div>
	<div class="table-responsive">
		<h4 class="sub-header">Currently Viewing</h4>
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
				@if($evaluation->subject->type != "faculty")
					<th>Resident/Fellow</th>
				@endif
					<th>Faculty</th>
					<th>Requested</th>
					<th>Completed</th>
					<th>Status</th>
					<th>Training Level</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ $evaluation->id }}</td>
					<td>{{ $evaluation->subject->last_name }}, {{ $evaluation->subject->first_name }}</td>
				@if($evaluation->subject->type != "faculty")
					<td>{{ $evaluation->evaluator->last_name }}, {{ $evaluation->evaluator->first_name }}</td>
				@endif
					<td>{{ $evaluation->request_date }}</td>
					<td>{{ $evaluation->complete_date }}</td>
					<td>{{ $evaluation->status }}</td>
					<td>{{ $evaluation->training_level }}</td>
				</tr>
			</tbody>
		</table>
		@if($evaluation->subject->photo_path)
			<div style="text-align: center;">
				<td><img src="/{{ $evaluation->subject->photo_path }}" width="300px" /></td>
			</div>
		@endif
		<br />
		<h4 class="sub-header">Evaluation</h4>
		<div id="form">
			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
				<form id="evaluation" role="form" method="post" action="#">
					{!! csrf_field() !!}
					<label for="evaluation_date">What month is this evaluation for?</label>
					<select class="form-control" id="evaluation_date" name="evaluation_date">
					<?php $month = Carbon\Carbon::parse("first day of this month"); ?>
						@for($i = 0; $i < 3; $i++, $month->subMonth())
							<option value="{{ $month->toDateString() }}">{{ $month->format("F") }}</option>
						@endfor
					</select>
			@endif
			{!! App\Helpers\FormReader::read($evaluation->form->xml_path) !!}
			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
					<button type="submit" id="complete-form" name="evaluation_id" value="{{ $evaluation->id }}" class="btn btn-primary">Submit</button>
					<button type="submit" id="save-form" name="evaluation_id_saved" value="{{ $evaluation->id }}" class="btn btn-default" formnovalidate>Save</button>
				</form>
			@endif
		</div>
	</div>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			@if($evaluation->status == "complete" || $user->id == $evaluation->evaluator_id)
				@foreach($evaluation->responses as $response)
					$("input[name='{{ $response->question_id }}'][value='{{ $response->response }}']").prop("checked", true);
				@endforeach

				@foreach($evaluation->textResponses as $response)
					$("textarea[name='{{ $response->question_id }}']").val("{{ $response->response }}");
				@endforeach
			@endif

			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id && isset($evaluation->evaluation_date))
				$("#evaluation_date option[value='{{ $evaluation->evaluation_date->toDateString() }}']").prop("selected", true);
			@endif

			@if($evaluation->status == "complete" || $user->id != $evaluation->evaluator_id)
				$("#form input").prop("disabled", true);
				$("#form textarea").prop("readonly", true);
			@endif
			$("#form textarea").width("90%");
			$("#form textarea").height($("#form textarea")[0].scrollHeight);
			$("#form textarea").addClass("noprint");
			$("#form textarea").parents("td").append("<div class='print'>"+$("#form textarea").val()+"</div>");
			$("#form button").each(function(){
				$(this).addClass("noprint");
			});
		});

		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			$("."+questionName).toggle();
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

		$("#complete-form").click(function(){
			saveForm = false;
		});

		$("#save-form").click(function(){
			saveForm = true;
		});
	</script>
@stop
