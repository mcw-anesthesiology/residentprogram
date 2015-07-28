@extends("auth.master")

@section("body")
	<form method="post" action="password/email">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" placeholder="Email" required />
		</div>
		<button type="submit" class="btn btn-primary">Send Reset Email</button>
	</form>
@stop
