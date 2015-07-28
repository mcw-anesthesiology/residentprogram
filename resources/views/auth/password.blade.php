@extends("auth.master")

@section("body")
	<form class="form-signin" method="post" action="/password/email">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" class="form-control" name="email" id="email" placeholder="Email" required />
		</div>
		<button type="submit" class="btn btn-primary">Send Reset Email</button>
	</form>
@stop
