@extends("auth.master")

@section("body")
	<form class="form-signin" role="form" method="post" action="/login">
		{!! csrf_field() !!}
		<h2>Resident Program</h2>
		<div class="form-group">
			<label for="username">Username</label>
			<input class="form-control" placeholder="Username" name="username" required autofocus />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input class="form-control" type="password" placeholder="Password" name="password" required />
		</div>
		<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	</form>
	<form class="form-signin" method="get" action="/password/email">
		<button class="btn btn-lg btn-block" type="submit">Forgot Password?</button>
	</form>
@stop
