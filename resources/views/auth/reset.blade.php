@extends("auth.master")

@section("body")
	<form class="form-signin" method="post" action="/password/reset">
		{!! csrf_field() !!}
		<input type="hidden" name="token" value="{{ $token }}" />
		<div class="form-group">
			<label for="email">Email Address</label>
			<input type="email" class="form-control" id="email" name="email" value="{{ old("email") }}" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" class="form-control" id="password" name="password" />
			<p>
				Passwords must be at least 6 characters in length
			</p>
		</div>
		<div class="form-group">
			<label for="password-confirm">Confirm Password</label>
			<input type="password" class="form-control" id="password-confirm" name="password_confirmation" />
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-primary">Reset Password</button>
			<button id="home-button" type="button" class="btn">Back to login</button>
		</div>
	</form>
@stop
