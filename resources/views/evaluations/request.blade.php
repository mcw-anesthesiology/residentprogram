@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer; }

		.date-heading {
			margin-top: 40px;
		}

		.submit-container {
			margin-top: 40px;
		}

		#evaluation-date-info {
			float: none !important;
		}
	</style>
@stop

@section("body")
	@if($requestType == "faculty")
	<h2 class="sub-header">Evaluate faculty</h2>
	@elseif($user->type == $evaluatorTypeText)
	<h2 class="sub-header">Create evaluation</h2>
	@else
	<h2 class="sub-header">Request evaluation</h2>
	@endif

	<form id="form" role="form" action="#" method="POST" class="form-horizontal">
	@if(!empty($blocks))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="block">Filter by block</label>
				<select class="form-control" id="block">
					<option value="0">Select from all {{ $subjectTypeTextPlural }}</option>
					@foreach($blocks as $block)
						@if($block->assignments->contains("user_id", $user->id))
							<option value="{{ $block->id }}">{{ $block->year }} {{ $block->block_name }}</option>
						@endif
					@endforeach
				</select>
			</div>
		</div>
	@endif
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />

	@if(!empty($subjects))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="subject">{{ ucfirst($subjectTypeText) }}</label>
		@if(!empty($groupSubjects))
				<div class="input-group select2-bootstrap-append">
		@endif
					<select class="form-control request-select" name="subject_id" id="subject" required>
						<option value="">Select {{ $subjectTypeText }}</option>
					</select>
		@if(!empty($groupSubjects))
					<span class="input-group-addon">
						<label><input type="checkbox" id="group-subjects" checked /> Group</label>
					</span>
				</div>
		@endif
			</div>
		</div>
	@endif

	@if(!empty($evaluators))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="evaluator">{{ ucfirst($evaluatorTypeText) }}</label>
		@if(!empty($groupEvaluators))
				<div class="input-group select2-bootstrap-append">
		@endif
					<select class="form-control request-select" name="evaluator_id" id="evaluator" required>
						<option value="">Select {{ $evaluatorTypeText }}</option>
					</select>
		@if(!empty($groupEvaluators))
					<span class="input-group-addon">
						<label><input type="checkbox" id="group-evaluators" checked /> Group</label>
					</span>
				</div>
		@endif
			</div>
		</div>
	@endif

		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="evaluation-form">Evaluation form</label>
		@if(!empty($groupForms))
				<div class="input-group select2-bootstrap-append">
		@endif
					<select class="form-control request-select" name="form_id" id="evaluation-form" required>
						<option value="">Select form</option>
					</select>
		@if(!empty($groupForms))
					<span class="input-group-addon">
						<label><input type="checkbox" id="group-forms" checked /> Group</label>
					</span>
				</div>
		@endif
			</div>
		</div>

		<h2 class="date-heading">When is this evaluation for?
			<a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Evaluation date" class="close" id="evaluation-date-info">
				<span class="glyphicon glyphicon-question-sign"></span>
			</a>
		</h2>

		<div class="form-group">
			<div class="col-md-offset-2 col-md-6">
				<label for="evaluation-month">Month</label>
				<select class="form-control request-select" id="evaluation-month" required>
						<option value="" disabled selected>Select a month</option>
					@foreach($months as $date => $monthName)
						<option value="{{ $date }}">{{ $monthName }}</option>
					@endforeach
				</select>
			</div>
			<div id="evaluation-day-div" class="collapse col-md-2">
				<label for="evaluation-day" class="text-muted">Date (optional)</label>
				<input type="text" class="form-control" id="evaluation-day" />
			</div>
			<input type="hidden" id="evaluation-date" name="evaluation_date" required />
		</div>
		<div class="submit-container text-center">
			<button type="submit" class="btn btn-primary btn-lg">
		@if((in_array($user->type, ["resident", "fellow"]) && $requestType == "faculty") || ($user->type == "faculty" && $requestType == "resident"))
				Create Evaluation
		@else
				Request Evaluation
		@endif
			</button>
		</div>
	</form>

	@if($user->type != "admin")
</div>
<div class="container body-block">
	<h3 class="sub-header">Block information</h3>
	<p>
		Selecting a block is used to filter the list of {{ $subjectTypeTextPlural }} to others who are scheduled in the same locations as you. This filter is not perfect.
		If the doctor you are looking for is missing after selecting a block, or an entire block is missing for you from the list, please select "select from all" for the block.
		You will then be able to select from the entire list of {{ $subjectTypeTextPlural }}.
	</p>
	@endif
	@if($user->type == "resident" && $requestType == "faculty" && $pendingEvalCount > 0)
</div>
<div class="container body-block">
	<h3 class="sub-header">Evaluations in progress</h3>
	<table class="table table-striped" id="pending-faculty-evals" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Faculty</th>
				<th>Started</th>
			</tr>
		</thead>
	</table>
	@endif
@stop

@section("script")
	<script>
	@if(!empty($evaluators))
		var evaluators = $.parseJSON('{!! $evaluators !!}');
	@endif
	@if(!empty($subjects))
		var subjects = $.parseJSON('{!! $subjects !!}');
	@endif
	@if(!empty($forms))
		var forms = $.parseJSON('{!! $forms !!}');
	@endif

	@if($user->type == "resident" && $requestType == "faculty")
		$(".table").on("click", ".view", function(){
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
			window.location.href = "/evaluation/"+requestId;
		});
	@endif

		var type = "{{ $user->type }}";
		var endOfMonth = {!! json_encode($endOfMonth) !!};

		$("#evaluation-month").change(function(){
			var date = $(this).val();
			var year = 0, month = 1, day = 2;
			var start = date.split("-");
			var end = endOfMonth[date].split("-");
			$("#evaluation-day-div").fadeIn();
			$("#evaluation-day").datepicker("setDate", "");
			$("#evaluation-day").datepicker("option", "minDate", new Date(start[year], start[month] - 1, start[day]));
			$("#evaluation-day").datepicker("option", "maxDate", new Date(end[year], end[month] - 1, end[day]));
			$("#evaluation-date").val(date);
		});

		$("#evaluation-day").change(function(){
			var date = $("#evaluation-month").val();
			var day = $("#evaluation-day").val();
			if(day.trim() == ""){
				day = "01";
				$("label[for='evaluation-day']").addClass("text-muted");
			}
			else
				$("label[for='evaluation-day']").removeClass("text-muted");

			$("#evaluation-date").val(date.substring(0, date.length-2)+day);
		});

		function selectBlock(){
			if(typeof(evaluators) != "undefined"){
				makeEvaluators();
			}
			if(typeof(subjects) != "undefined"){
				makeSubjects();
			}
		}

		function makeEvaluators(){
			var block = 0;
			if($("#block").length)
				block = $("#block").val();

			makeSelect("evaluator", "{{ $evaluatorTypeText }}", evaluators[block], evaluators.group, "group-evaluators");

			$("#evaluator").val(null).select2({
				placeholder: "Select {{ $evaluatorTypeText }}"
			});
		}

		function makeSubjects(){
			var block = 0;
			if($("#block").length)
				block = $("#block").val();

			makeSelect("subject", "{{ $subjectTypeText }}", subjects[block], subjects.groups, "group-subjects");

			$("#subject").val(null).select2({
				placeholder: "Select {{ $subjectTypeText }}"
			});
		}

		function makeForms(type){
			var selectId = "evaluation-form";
			var selectType = "form";
	@if(!empty($formGroups))
			var formGroups = {!! $formGroups !!};
	@endif
			makeSelect(selectId, selectType, forms, formGroups, "group-forms");

	@if($requestType == "faculty")
			$("#evaluation-form").select2();
			$("#evaluation-form option:eq(1)").prop("selected", true).trigger("change");
	@else
			$("#evaluation-form").val(null).select2({
				placeholder: "Select form"
			});
	@endif
		}

		function makeSelect(selectId, selectType, options, groups, groupId){
			var groupChecked = false;
			if(typeof(groupId) != "undefined")
				groupChecked = $("#"+groupId).prop("checked");

			var select = document.getElementById(selectId);
			while(select.firstChild)
				select.removeChild(select.firstChild);

			var option = document.createElement("option");
			option.value = "";
			option.textContent = "Select " + selectType;
			select.appendChild(option);

			if(typeof(options) != "undefined"){
				if(typeof(groups) != "undefined" && groupChecked){
					var optGroups = {};
					for(group in groups){
						optGroups[group] = document.createElement("optgroup");
						optGroups[group].label = groups[group];
					}
				}

				for(var i = 0; i < options.length; i++){
					var option = document.createElement("option");
					option.value = options[i].id;
					option.textContent = options[i].name;
					if(typeof(groups) != "undefined" && groupChecked)
						optGroups[options[i].group].appendChild(option);
					else
						select.appendChild(option);
				}

				if(typeof(groups) != "undefined" && groupChecked){
					for(group in optGroups){
						select.appendChild(optGroups[group]);
					}
				}
			}
		}

		$("#block").change(selectBlock);

		$(document).ready(function(){

			$("#evaluation-day").datepicker({
				dateFormat: "dd"
			});

	@if($user->type == "resident" && $requestType == "faculty")
			$("#block").select2();
			$("#pending-faculty-evals").DataTable({
				"ajax": "/dashboard/faculty/evaluations",
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});
	@endif

			$("#block option:eq(0)").prop("selected", true).trigger("change");
			selectBlock();
			$("#block").select2();

			makeForms();

			$("#evaluation-month").select2({
				placeholder: "Select a month"
			})
		});

		function checkSelectValues(){
			var optionsSelected = true;
			$(".request-select").each(function(){
				if($(this).val() === null || $(this).val() == "" || $(this).val() == 0){
					optionsSelected = false;
				}
			});
			if(!optionsSelected){
				alert("Please complete all selections");
			}
			return optionsSelected;
		}

		$("#form").submit(checkSelectValues);

		$("#evaluation-date-info").popover({
			html: true,
			content: "<p>Please enter the month that this evaluation is for. " +
				"If this evaluation is for a specific date, you may enter that as well.</p>" +
				"<p>Previously, evaluation dates were entered when the " +
				"evaluations were completed instead of when they were created. " +
				"This caused some occasionally inaccurate dates.</p>"
		});


		$("#group-subjects").change(function(){
			var subject = $("#subject").val();
			makeSubjects();
			$("#subject").val(subject).trigger("change");
		});

		$("#group-evaluators").change(function(){
			var evaluator = $("#evaluator").val();
			makeEvaluators();
			$("#evaluator").val(evaluator).trigger("change");
		});

		$("#group-forms").change(function(){
			var form = $("#evaluation-form").val();
			makeForms();
			$("#evaluation-form").val(form).trigger("change");
		});

	</script>
@stop
