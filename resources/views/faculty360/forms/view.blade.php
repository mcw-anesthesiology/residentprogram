@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<form-reader v-bind="form" readonly>
		</form-reader>

		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script>
		var propsData = {
			form: {!! $form->toJson() !!}
		};

		createFaculty360ViewForm('main', propsData);
	</script>
@endpush
