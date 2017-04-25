@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<div v-if="merit">
			<h2>{{ merit.name }}</h2>
			<json-schema-editor :current-value="merit.form"
				schema-url="/schemas/merit-report.json" name="merit form"
				@submit="handleMeritSubmit"></json-schema-editor>			
		</div>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		var vm = createManageMerit('main');
	</script>
@endpush
