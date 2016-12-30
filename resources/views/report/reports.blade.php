@extends("app")

@section("blockless-body")
	<div id="reports">
		<div class="text-center">
			<img src="/ajax-loader.gif" alt="" /> Loading
		</div>
	</div>
@stop

@section("script")
	<script src="/js/vue-constructors.js"></script>
	<script>
		var vm = createReports('#reports');
	</script>
@stop
