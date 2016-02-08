@extends("auth.master")

@section("body")
	<h3></h3>
	<form class="form-signin" method="post" action="/password/email">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="email">Email Address</label>
			<input type="email" class="form-control" name="email" id="email" placeholder="Email Address" required />
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-primary btn-50">Send Reset Email</button>
			<button id="home-button" type="button" class="btn btn-50">Back to login</button>
		</div>
	</form>

	<br />
	<div id="info">
		<p>
			If you are unable to successfully reset your password, please contact me at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a> and I can help you reset it.
		</p>
	</div>
@stop
