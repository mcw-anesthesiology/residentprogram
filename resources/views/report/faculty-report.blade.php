@extends("app")

@section("head")

@stop

@section("body")
	<div id="form">
		{!! App\Helpers\FormReader::read($formPath) !!}
	</div>
@stop

@section("script")
	<script>
		var subjectEvals = $.parseJSON('{!! $subjectEvals !!}');
		var averageEvals = {{ $averageEvals }};
		var subjectPercentages = $.parseJSON('{!! $subjectPercentages !!}');
		var averagePercentages = $.parseJSON('{!! $averagePercentages !!}');
		var subjects = $.parseJSON('{!! $subjects !!}');
		var questions = $.parseJSON('{!! $questions !!}');
		var responses = $.parseJSON('{!! $questionResponses !!}');
		$(document).ready(function(){
			$("#form input").prop("disabled", true).hide();

			subjects.forEach(function(subjectId, a, b){
				questions.forEach(function(questionId, c, d){
					responses[questionId].forEach(function(response, e, f){
						if($("input[name='"+questionId+"'][value='"+response+"']").length > 0)
							$("input[name='"+questionId+"'][value='"+response+"']").parents("td").append(subjectPercentages[subjectId][questionId][response]+"%<br />"+averagePercentages[questionId][response]+"%")[0].style.textAlign = "center";
					});
				});
			});
		});
	</script>
@stop
