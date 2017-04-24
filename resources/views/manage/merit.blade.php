@extends('app')

@section('blockless-body')
	<json-schema-editor schema-url="/schemas/merit-report.json"></json-schema-editor>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		var vm = createManageMerit('main');
	</script>
@endpush
