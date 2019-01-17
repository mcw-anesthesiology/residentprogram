@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<p v-show="false" class="lead">
			Loading...
		</p>
		<form-reader v-bind="evaluation" :title="evaluation.form.title" readonly>
		</form-reader>
	</div>
@stop

@push('scripts')
	<script>
		var propsData = {
			evaluation: {!! $evaluation->toJson() !!}
		};

		createFaculty360ViewEvaluation('main', propsData);
	</script>
@endpush
