@extends("auth.master")

@section("body")
	<h2>Reset password</h2>
	<p class="lead">
		Please enter your email address, you will be sent a link to create a new password.
	</p>
	<p>
		If you do not receive an email, please double check the email you entered.
	</p>
	<form class="form-signin form" method="post" action="/password/email">
		{!! csrf_field() !!}
		<div class="col-xs-12 col-sm-8 col-sm-offset-2">			
			<div class="form-group">
				<label for="email">Email Address</label>
				<input type="email" class="form-control" name="email" id="email" placeholder="Email Address" required />
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-2">
				<button type="submit" class="btn btn-primary btn-block">Send Reset Email</button>
			</div>
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0">
				<a href="/" role="button" class="btn btn-default btn-block">Back to login</a>
			</div>
		</div>
	</form>

	<br />
	<div id="info">
		<p>
			If you are unable to successfully reset your password, please contact me at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a> and I can help you reset it.
		</p>
	</div>
@stop
