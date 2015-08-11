@extends("auth.master")

@section("head")
	<style>
		#info {
			margin: auto;
			text-align: center;
			width: 50%;
		}
	</style>
@stop

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

	<br />
	<div id="info">
		<p>
			Due to some changes made in regard to authentication, it is possible you may be unable to login with your current password.
			If this is the case, please attempt to reset it using the button above and your email address, or contact me at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a> and I can help you reset it.
		</p>
		<p>
			I apologize for any inconvenience this may cause.
		</p>
	</div>
@stop
