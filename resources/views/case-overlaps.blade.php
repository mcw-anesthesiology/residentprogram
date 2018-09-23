@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-reports.css') }}" />
@endpush

@section('blockless-body')

<div class="container body-block">
	<h1>Detailed pairing report</h1>

	<div class="row">
		<div class="col-sm-6">
			<label class="containing-label">
				Report dates
				<vue-flatpickr class="form-control appear-not-readonly"
					:options="{
						mode: 'range',
						dateFormat: 'F j, Y',
						defaultDate: reportDates
					}"
					@change="reportDates = arguments[0]">
				</vue-flatpickr>
			</label>
		</div>
		<div class="col-sm-6">
			<label class="containing-label">
				Subject type
				<select v-cloak class="form-control" v-model="subjectType">
					<option v-for="type of subjectTypes"
							:value="type">
						@{{ ucfirst(type) }}
					</option>
				</select>
			</label>
		</div>
	</div>

	<div v-if="ready">
		<case-overlap :user="user"
			:pairings="pairings"
			:subject-type="subjectType"
			:report-dates="reportDates">
		</case-overlap>
	</div>
</div>

@endsection

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};

		createCaseOverlaps('main', propsData);
	</script>
@endpush
