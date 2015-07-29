@extends("auth.master")

@section("body")
	<form class="form-signin" method="post" action="/password/reset">
		{!! csrf_field() !!}
		<input type="hidden" name="token" value="{{ $token }}" />
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" id="email" name="email" value="{{ old("email") }}" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" id="password" name="password" />
		</div>
		<div class="form-group">
			<label for="password-confirm">Confirm Password</label>
			<input type="password" id="password-confirm" name="password_confirmation" />
		</div>
		<button type="submit">Reset Password</button>
	</form>
@stop
