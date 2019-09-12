@extends("app")

@section("blockless-body")
	<manage-mentors></manage-mentors>
@endsection

@section("script")
	<script>
		createManageMentors('main');
	</script>
@stop
