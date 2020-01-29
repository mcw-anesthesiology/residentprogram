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

		.toggle-all-button-container {
			display: flex;
			justify-content: space-around;
		}

		@media (print) {
			.toggle-all-button-container {
				display: none;
			}
		}
	</style>
@stop

@section("body")
	<div class="toggle-all-button-container">
		<button type="button" id="toggle-all-description-button" class="btn btn-info">
			<span class="glyphicon glyphicon-zoom-in"></span>
			Toggle all descriptions
		</button>

		<button type="button" id="toggle-all-mc-button" class="btn btn-info">
			<span class="glyphicon glyphicon-list"></span>
			Toggle all milestones and competencies
		</button>
	</div>

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

			$('#toggle-all-description-button').click(function() {
				$('#form').find('.toggle-descriptions').click();
			});

			$('#toggle-all-mc-button').click(function() {
				$('#form').find('.toggle-milestone-competencies-button').click();
			});
		});
	</script>
@stop
