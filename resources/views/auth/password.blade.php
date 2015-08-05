@extends("auth.master")

@section("body")
	<form class="form-signin" method="post" action="/password/email">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" class="form-control" name="email" id="email" placeholder="Email" required />
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-primary">Send Reset Email</button>
			<button id="home-button" type="button" class="btn">Back to login</button>			
		</div>
	</form>
@stop
