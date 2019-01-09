@extends("app")

@section('blockless-body')
	<div id="alumni"></div>
@stop

@section("script")
	<script>
		createManageAlumni('#alumni');

		var replacements = [
			"Name",
			"First name",
			"Last name",
			"Update link",
			"Unsub link"
		];
	</script>
@stop
