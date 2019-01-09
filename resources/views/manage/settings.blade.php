@extends("app")

@section("body")
	<form role="form" method="post">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="required-faculty-evals" class="col-md-6">Number of faculty evaluations before releasing</label>
			<input type="number" class="form-control col-md-6" id="required-faculty-evals" name="required_faculty_evals" value="{{ $facultyEvalThreshold ?? 3 }}" />
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
@stop

@section("script")

@stop
