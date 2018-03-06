@extends('app')

@section('blockless-body')

<div class="container body-block">
	<h1>Detailed pairing report</h1>

	<div class="row">
		<label class="containing-label">
			Report dates
			<vue-flatpickr class="form-control appear-not-readonly"
				:options="{mode: 'range'}"
				v-model="reportDatesStr"
				@change="handleReportDatesChange">
			</vue-flatpickr>
		</label>
		<label class="containing-label">
			Subject type
			<select class="form-control" v-model="subjectType">
				<option v-for="type of subjectTypes"
						:value="type">
					@{{ ucfirst(type) }}
				</option>
			</select>
		</label>
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
