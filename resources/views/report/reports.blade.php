@extends("app")

@section("body")
	<h1 class="header">Reports</h1>
@stop

@section("blockless-body")
	<div id="reports"></div>
@stop

@section("script")
	<script src="/js/vue-constructors.js"></script>
	<script>
		var vm = createReports('#reports');
	</script>
@stop
