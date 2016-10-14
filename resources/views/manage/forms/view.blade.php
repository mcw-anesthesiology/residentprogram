@extends("app")

@section("head")
	<style>
		textarea {
			width: 100%;
			resize: none;
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
		var milestoneQuestions = {!! json_encode($form->milestoneQuestions) !!};
		var competencyQuestions = {!! json_encode($form->competencyQuestions) !!};
		$(document).ready(function(){
			$("#form input").prop("disabled", true);
			$("#form textarea").prop("disabled", true);
			$("#form button").each(function(){
				$(this).addClass("noprint");
			});
			$("#form textarea").addClass("noprint");

			var uls = {};
			var mq, li;
			for(var i = 0; i < milestoneQuestions.length; i++){
				mq = milestoneQuestions[i];
				if(!uls.hasOwnProperty(milestoneQuestions[i].question_id)){
					uls[mq.question_id] = document.createElement('ul');
					uls[mq.question_id].className = 'list-group';
					document.querySelector('#' + mq.question_id + ' .panel-footer')
						.appendChild(uls[mq.question_id]);

					li = document.createElement('li');
					li.className = 'list-group-item list-group-item-info';
					li.appendChild(document.createTextNode('Milestones'));
					uls[mq.question_id].appendChild(li);
				}

				li = document.createElement('li');
				li.className = 'list-group-item';
				li.appendChild(document.createTextNode(mq.milestone.title));
				uls[mq.question_id].appendChild(li);
			}

			uls = {};
			var cq;
			for(var i = 0; i < competencyQuestions.length; i++){
				cq = competencyQuestions[i];
				if(!uls.hasOwnProperty(competencyQuestions[i].question_id)){
					uls[cq.question_id] = document.createElement('ul');
					uls[cq.question_id].className = 'list-group';
					document.querySelector('#' + cq.question_id + ' .panel-footer')
						.appendChild(uls[cq.question_id]);

					li = document.createElement('li');
					li.className = 'list-group-item list-group-item-info';
					li.appendChild(document.createTextNode('Competency'));
					uls[cq.question_id].appendChild(li);
				}

				li = document.createElement('li');
				li.className = 'list-group-item';
				li.appendChild(document.createTextNode(cq.competency.title));
				uls[cq.question_id].appendChild(li);
			}
		});
	</script>
@stop
