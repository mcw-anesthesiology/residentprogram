@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-case-log.css') }}" />
	<style>
		#case-log-table tr {
			cursor: pointer;
		}
	</style>
@endpush

@section('blockless-body')
<div class="container body-block">
	<h1>Case Log</h1>
	<div class="row">
		<div class="col-md-4 col-md-offset-8">
			<label for="case-log-details-report-name">Report on</label>
			<select class="form-control" id="case-log-details-report-name"></select>
		</div>
	</div>
	<section id="case-log-stats-container"></section>

	<component-list v-if="isAdmin"
			:fields="caseLogFields"
			:items="groupedCaseLogs">
		<template scope="user">
			<li>
				<div class="panel panel-default">
					<div class="panel-heading">
						<span class="panel-title">
							@{{ user.full_name }}
						</span>
					</div>
					<div class="panel-body">
						<case-logs :case-logs="user.caseLogs"
							:locations="locations">
						</case-logs>
					</div>
				</div>
			</li>
		</template>
	</component-list>
	<div v-else>
		<case-logs :case-logs="caseLogs"
			:locations="locations">
		</case-logs>
	</div>

	@if($canLog)
	<button type="button" class="btn btn-primary center-block" id="add-case-log-button">
		<span class="glyphicon glyphicon-plus"></span>
		Add entry
	</button>
	@endif
</div>

<div class="container body-block collapse" id="view-case-log-entry-container">
	<button type="button" class="close close-body-block-button" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h2>View entry</h2>
	@include("case-log.pieces.base")

	<section id="view-case-log-details"></section>

	@if($canLog)
</div>
<div class="container body-block collapse" id="add-case-log-entry-container">
	<button type="button" class="close hide-body-block-button" aria-label="Close">
		<span aria-hidden="true">&minus;</span>
	</button>
	@include("case-log.add-entry")
	@endif
</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-case-log.js') }}"></script>
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			detailsSchema: {!! $detailsSchema->toJson() !!},
			locations: {!! $locations->toJson() !!}
		};

		createCaseLog('main', propsData);

		propsData.detailsSchema.schema.forEach(function(schema){
			schema.subsections.forEach(function(subsection){
				var option = document.createElement("option");
				option.appendChild(document.createTextNode(subsection.name));
				document.querySelector("#case-log-details-report-name")
					.appendChild(option);
			});
		});

	@if($canLog)
		$("#add-case-log-entry-container .datetimepicker").datetimepicker({
			defaultDate: moment(),
			stepping: 1440,
			format: "M/D/Y"
		});

		renderCaseLogDetailsSchema(propsData.detailsSchema.schema, undefined, document.querySelector("#case-entry-form .case-details"));
	@endif

		$("#add-case-log-button").click(function(){
			var form = $("#case-entry-form");
			form.parent().velocity("slideDown");
		});

		$("#case-entry-form").submit(function(event){
			event.preventDefault();
			try {
				var form = $(this);
				var button = $(this).find("button[type='submit']");
				button.prop("disabled", true).addClass("disabled");
				var caseDate = $("#add-case-log-entry-container .datetimepicker")
					.data("DateTimePicker").date();
				if(!caseDate)
					throw new Error("Invalid date");
				$(this).find("input[name='case_date']")
					.val(caseDate.format("Y-MM-DD"));

				var data = $(this).serializeArray();
				var action = $(this).attr("action");
				var method = $(this).attr("method");
				$.ajax({
					url: action,
					method: method,
					data: data
				}).done(function(response){
					if(response === "success"){
						caseLogTable.ajax.reload(runCaseLogsReport);
						form[0].reset();
						form.parent().velocity("slideUp");
					} else {
						appendAlert("There was a problem saving the entry, please reload the page and try again. "
							+ "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
					}
				}).fail(function(err){
					appendAlert("There was a problem saving the entry, please reload the page and try again. "
						+ "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
				}).always(function(){
					button.prop("disabled", false).removeClass("disabled");
				});
			} catch(e){
				var alertMessage = "There was a problem submitting the entry, please check your selections. ";
				if(e.message === "Invalid date")
					alertMessage = "Invalid date, please use the picker or make sure it's formatted as (MM/DD/YYYY). ";
				appendAlert(alertMessage + "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
			}
		});
	</script>
@endpush
