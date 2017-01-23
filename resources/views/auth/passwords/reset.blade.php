@extends("auth.master")

@section("body")
	<h2>Reset password</h2>
	<p class="lead">
		Please reenter your email address and enter a new password.
	</p>
	<form class="form-signin" method="post" action="/password/reset">
		{!! csrf_field() !!}
		<input type="hidden" name="token" value="{{ $token }}" />
		<div class="form-group">
			<label for="email">Email Address</label>
			<input type="email" class="form-control" id="email" name="email" value="{{ old("email") }}" placeholder="Email" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" class="form-control" id="password" name="password" placeholder="Password" />
			<p>
				Passwords must be at least 6 characters in length
			</p>
		</div>
		<div class="form-group">
			<label for="password-confirm">Confirm Password</label>
			<input type="password" class="form-control" id="password-confirm" name="password_confirmation" placeholder="Confirm password" />
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-primary">Reset Password</button>
			<a href="/" role="button" class="btn btn-default">Back to login</a>
		</div>
	</form>
@stop
