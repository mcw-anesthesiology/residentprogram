@extends("app")

@section("blockless-body")
	<div id="reports">
		<div class="text-center">
			<img src="/ajax-loader.gif" alt="" /> Loading
		</div>
	</div>
@stop

@section("script")
	<script src="/js/vue-deps.js"></script>
	<script src="/js/vue-reports.js"></script>
	<script>
		var vm = createReports('#reports');
	</script>
@stop
