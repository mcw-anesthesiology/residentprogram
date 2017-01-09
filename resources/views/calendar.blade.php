@extends('app')

@section('head')
	<style>
		#calendar {
			width: 100%;
			height: auto;
			border: none;
		}
	</style>
@stop

@section('body')
	<iframe id="calendar" src="https://mcw-anesth-calendar.now.sh"></iframe>
@stop

@section('script')
	<script src="{{ elixir('js/iframeResizer.min.js') }}"></script>
	<script>
		$("#calendar").iFrameResize({
			heightCalculationMethod: 'taggedElement'
		});
	</script>
@stop
