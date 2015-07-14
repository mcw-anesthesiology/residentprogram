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
					<th>Resident/Fellow</th>
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
					<td>{{ $evaluation->evaluator->last_name }}, {{ $evaluation->evaluator->first_name }}</td>
					<td>{{ $evaluation->request_date }}</td>
					<td>{{ $evaluation->complete_date }}</td>
					<td>{{ $evaluation->status }}</td>
					<td>{{ $evaluation->training_level }}</td>
				</tr>
			</tbody>
		</table>
		<br />
		<h4 class="sub-header">Evaluation</h4>
		<div id="form">
			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
				<form id="evaluation" role="form" method="post" action="#">
					{!! csrf_field() !!}

			@endif
			{!! App\Helpers\FormReader::read($evaluation->form->xml_path) !!}
			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
					<button type="submit" name="evaluation_id" value="{{ $evaluation->id }}" class="btn btn-primary">Submit</button>
					<button type="submit" name="evaluation_id_saved" value="{{ $evaluation->id }}" class="btn btn-default" formnovalidate>Save</button>
				</form>
			@endif
		</div>
	</div>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			@foreach($evaluation->responses as $response)
				$("input[name='{{ $response->question_id }}'][value='{{ $response->response }}']").prop("checked", true);
			@endforeach

			@foreach($evaluation->textResponses as $response)
				$("textarea[name='{{ $response->question_id }}']").val("{{ $response->response }}");
			@endforeach

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
	</script>
@stop
