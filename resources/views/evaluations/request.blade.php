@extends("app")

@section("head")
	<style>
		.date-heading {
			margin-top: 40px;
		}

		.submit-container {
			margin-top: 40px;
		}

		#evaluation-date-info {
			float: none !important;
		}

		.admin-panel-group {
			margin-bottom: 15px;
		}
	</style>
@stop

@section("body")
	@if($user->isType($evaluatorTypes))
	<h2 class="sub-header">Create {{ $requestTypeText }} evaluation</h2>
	@else
	<h2 class="sub-header">Request {{ $requestTypeText }} evaluation</h2>
	@endif

	<form id="form" role="form" action="#" method="POST" class="form-horizontal">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
	@if(!empty($blocks))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="block">Filter by block</label>
				<select class="form-control" id="block">
		@if($user->isType($evaluatorTypes))
					<option value="0">Select from all {{ $subjectTypeTextPlural }}</option>
		@else
					<option value="0">Select from all {{ $evaluatorTypeText }}</option>
		@endif
					@foreach($blocks as $block)
						@if($block->assignments->contains("user_id", $user->id))
							<option value="{{ $block->id }}">{{ $block->year }} {{ $block->block_name }}</option>
						@endif
					@endforeach
				</select>
			</div>
		</div>
	@endif

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

	@if($user->isType("admin"))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading">Admin controls</div>
					<div class="panel-body">
						<div class="admin-panel-group form-horizontal row">
							<div class="col-sm-12">
								<label>
									<input type="checkbox" id="force-notification" name="force_notification" value="true" />
									Force notification
								</label>
							</div>
						</div>
						<div class="admin-panel-group form-horizontal row">
							<div class="col-sm-6">
								<label>
									<input type="checkbox" id="send-hash" name="send_hash" value="true" />
									Send personalized completion link
								</label>
							</div>
							<div class="col-sm-6">
								<label class="collapse">
									Hash expires in
									<select class="form-control" id="hash-expires-in" name="hash_expires_in" />
										<option value="30">30 days</option>
										<option value="60">60 days</option>
										<option value="90">90 days</option>
										<option value="never">Never expires</option>
									</select>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	@endif

		<div class="submit-container text-center">
			<button type="submit" class="btn btn-primary btn-lg">
		@if($user->isType($evaluatorTypes))
				Create Evaluation
		@else
				Request Evaluation
		@endif
			</button>
		</div>
	</form>

	@if($user->isType(["resident", "faculty"]))
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
	var requestType = "{{ $requestType }}";
	@if(!empty($evaluators))
		var evaluators = $.parseJSON('{!! $evaluators !!}');
	@endif
	@if(!empty($subjects))
		var subjects = $.parseJSON('{!! $subjects !!}');
	@endif
	@if(!empty($forms))
		var forms = $.parseJSON('{!! $forms !!}');
	@endif

		var type = "{{ $user->type }}";
		var endOfMonth = {!! json_encode($endOfMonth) !!};

		$("#subject").change(function(){
			var selectedType = $("#subject option:selected").parent().attr("label");
			if(selectedType === "Fellow"){
				$("#evaluation-form optgroup[label='Resident'] option").prop("disabled", true);
				$("#evaluation-form optgroup[label='Fellow'] option").prop("disabled", false);
				$("#evaluation-form").val("").select2();
			}
			else {
				$("#evaluation-form optgroup[label='Resident'] option").prop("disabled", false);
				$("#evaluation-form optgroup[label='Fellow'] option").prop("disabled", true);
				$("#evaluation-form").val("").select2();
			}
		});

		$("#evaluation-month").change(function(){
			var date = $(this).val();
			var year = 0, month = 1, day = 2;
			var start = date.split("-");
			var end = endOfMonth[date].split("-");
			$("#evaluation-day-div").velocity("fadeIn");
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

			$("#evaluator").val(null).change().select2({
				placeholder: "Select {{ $evaluatorTypeText }}"
			});
		}

		function makeSubjects(){
			var block = 0;
			if($("#block").length)
				block = $("#block").val();

			makeSelect("subject", "{{ $subjectTypeText }}", subjects[block], subjects.groups, "group-subjects");

			$("#subject").val(null).change().select2({
				placeholder: "Select {{ $subjectTypeText }}"
			});
		}

		function makeForms(type){
			var selectId = "evaluation-form";
			var selectType = "form";
			var formGroups;
	@if(!empty($formGroups))
			formGroups = {!! $formGroups !!};
	@endif
			makeSelect(selectId, selectType, forms, formGroups, "group-forms");

			$("#evaluation-form").val(null).change().select2({
				placeholder: "Select form"
			});
			if(forms.length == 1)
				$("#evaluation-form option:eq(1)").prop("selected", true).trigger("change");
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
						if(optGroups[group].childNodes.length > 0)
							select.appendChild(optGroups[group]);
					}
				}
			}
		}

		$("#block").change(selectBlock);

		$("#send-hash").change(function(){
			if($(this).prop("checked"))
				$("#hash-expires-in").parent().velocity("slideDown");
			else
				$("#hash-expires-in").parent().velocity("slideUp");
		});

		$(document).ready(function(){

			if(requestType == "staff"){
				$("#send-hash").prop("checked", true);
				$("#hash-expires-in").parent().velocity("slideDown");
			}

			$("#evaluation-day").datepicker({
				dateFormat: "dd"
			});

	@if($user->type == "resident" && $requestType == "faculty")
			$("#block").select2();
			$("#pending-faculty-evals").DataTable({
				"ajax": "/dashboard/faculty/evaluations",
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$(row).addClass("view-evaluation");
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

		function checkDate(){
			var date = $("#evaluation-date").val();

			if(!moment(date).isValid()){
				appendAlert("Invalid date. Please make sure the date of the month is correct.",
					$("#evaluation-day-div"));
				$("#evaluation-day-div .alert").get(0).style = "margin-top: 10px;";
				return false;
			}
			return true;
		}

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

		$("#form").submit(function(){
			return (checkSelectValues() && checkDate());
		});

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
