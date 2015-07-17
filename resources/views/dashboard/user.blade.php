@extends("app")

@section("body")
	<form role="form" id="password-form" action="#" method="post">
		{!! csrf_field() !!}
		<h3 class="sub-header">Update Password</h3>
		<div class="form-group">
			<label for="old-password">Old Password</label>
			<input type="password" class="form-control" id="old-password" name="old_password" placeholder="Current Password" required />
		</div>
		<div class="form-group">
			<label for="new-password">New Password</label>
			<input type="password" class="form-control" id="new-password" name="new_password" placeholder="New Password" required />
		</div>
		<div class="form-group">
			<label for="new-password-confirm">Confirm New Password <span class="glyphicon form-control-feedback" id="confirm-icon"></span></label>
			<input type="password" class="form-control" id="new-password-confirm" name="new_password_confirm" placeholder="Confirm New Password" required />
		</div>
		<button type="submit" class="btn btn-default">Update Password</button>
	</form>
@stop

@section("script")
	<script>
		$("#new-password-confirm").keyup(function(){
			if($("#new-password").val() == $("#new-password-confirm").val())
				$("#confirm-icon").attr("class", "glyphicon glyphicon-ok form-control-feedback");
			else
				$("#confirm-icon").attr("class", "glyphicon glyphicon-remove form-control-feedback");
		});
	</script>
@stop
