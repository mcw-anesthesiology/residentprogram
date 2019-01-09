@extends("app")

@section("head")
	<style>
		textarea {
			width: 100%;
			resize: none;
		}

		hr {
			page-break-before: always;
		}
	</style>
@stop

@section("body")
	<div id="form">
		{!! App\Helpers\FormReader::read($form->xml_path) !!}
	</div>
@stop

@section("script")
	<script>
		var milestoneQuestions = {!! $form->milestoneQuestions->groupBy('question_id')->toJson() !!};
		var competencyQuestions = {!! $form->competencyQuestions->groupBy('question_id')->toJson() !!};
		$(document).ready(function(){
			$("#form input").prop("disabled", true);
			$("#form textarea").prop("disabled", true);
			$("#form button").each(function(){
				$(this).addClass("noprint");
			});
			$("#form textarea").addClass("noprint");

			renderMilestoneCompetencyLists(milestoneQuestions, competencyQuestions);
		});
	</script>
@stop
