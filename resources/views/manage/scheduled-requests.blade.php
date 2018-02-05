@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<h1>Scheduled requests</h1>

		<component-list :items="scheduledRequests"
				:fields="scheduledRequestFields"
				:field-accessors="scheduledRequestFieldAccessors"
				:sort-functions="scheduledRequestSortFunctions"
				reloadable
				@reload="fetchScheduledRequests">
			<template slot-scope="scheduledRequest">
				<div class="row component-list-item">
					<div class="col-sm-1">
						<small>#</small>
						@{{ scheduledRequest.id }}
					</div>
					<div class="col-sm-3">
						<small>Subject</small>
						@{{ scheduledRequest.subject.full_name }}
					</div>
					<div class="col-sm-3">
						<small>Evaluator</small>
						@{{ scheduledRequest.evaluator.full_name }}
					</div>
					<div class="col-sm-3">
						<small>Form</small>
						@{{ scheduledRequest.form.title }}
					</div>
					<div class="col-sm-2">
						<confirmation-button class="btn btn-xs"
								unpressed-class="btn-danger"
								pressed-class="btn-warning"
								@click="deleteRequest(scheduledRequest)">
							<span class="glyphicon glyphicon-remove"></span>
							Delete
							<template slot="pressed">
								<span class="glyphicon glyphicon-warning-sign"></span>
								Delete
							</template>
						</confirmation-button>
					</div>
					<div class="col-sm-3">
						<small>Evaluation date</small>
						<rich-date-range :dates="scheduledRequest"
							start="evaluation_date_start"
							end="evaluation_date_end">
						</rich-date-range>
					</div>
					<div class="col-sm-3">
						<small>Request date</small>
						<rich-date :date="scheduledRequest.request_date" time>
						</rich-date>
					</div>
					<div class="col-sm-3">
						<small>Scheduled</small>
						<rich-date :date="scheduledRequest.scheduled_date" time>
						</rich-date>
					</div>
					<div class="col-sm-3">
						<small>Scheduled by</small>
						@{{ scheduledRequest.requestor.full_name }}
					</div>
				</div>
			</template>
		</component-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		var propsData = {};

		createManageScheduledRequests('main', propsData);
	</script>
@endpush
