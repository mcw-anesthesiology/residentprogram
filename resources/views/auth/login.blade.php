@extends("auth.master")

@section("body")
	<form class="form-signin form" role="form" method="post" action="/login">
		{!! csrf_field() !!}
		<div class="row">
			<div class="col-md-5 col-md-offset-1 col-sm-8 col-sm-offset-2 col-xs-12">
				<div class="form-group">
					<label for="username">Email address</label>
					<input type="email" class="form-control" placeholder="Email" name="username" required autofocus autocapitalize="off" autocorrect="off" />
				</div>
			</div>
			<div class="col-md-5 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12">
				<div class="form-group">
					<label for="password">Password</label>
					<input class="form-control" type="password" placeholder="Password" name="password" required />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 login-submit-container">
				<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			</div>
		</div>
	</form>
	<div class="row">
		<div class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 reset-password-container">
			<a href="https://auth.mcw-anesthesiology.tech/reset-password" role="button" class="btn btn-lg btn-default btn-block">Forgot Password?</a>
		</div>
	</div>
@stop
