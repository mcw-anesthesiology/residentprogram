@extends("app")

@section("blockless-body")
<div class="container body-block">
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
		<button type="submit" class="btn btn-primary">Update Password</button>
	</form>
</div>

	@if($user->type == "faculty")

<div class="container body-block">
	<form role="form" id="reminders-form" action="/user/reminders" method="post">
		{!! csrf_field() !!}
		<h3 class="sub-header">Reminders</h3>
		<div class="form-group">
			<label for="frequency">Frequency</label>
			<select class="form-control" id="frequency" name="frequency">
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
				<option value="biweekly">Biweekly</option>
				<option value="none">None</option>
			</select>
		</div>
		<div class="form-group">
			<input type="checkbox" value="yes" id="only-if-pending" name="only_if_pending" />
			<label for="only-if-pending">Only send reminders if pending evaluations</label>
		</div>
		<button type="submit" class="btn btn-primary">Update Reminder Preferences</button>
	</form>
</div>

<div class="container body-block">
	<form role="form" id="notifications-form" action="/user/notifications" method="post">
		{!! csrf_field() !!}
		<h3 class="sub-header">Notifications</h3>
		<div class="form-group">
			<select class="form-control" id="notifications" name="notifications">
				<option value="yes">Enabled</option>
				<option value="no">Disabled</option>
			</select>
		</div>
		<button type="submit" class="btn btn-primary">Update Notification Preferences</button>
	</form>
</div>

	@endif
@stop

@section("script")
	<script>
		$("#new-password-confirm").keyup(function(){
			if($("#new-password").val() == $("#new-password-confirm").val())
				$("#confirm-icon").attr("class", "glyphicon glyphicon-ok form-control-feedback");
			else
				$("#confirm-icon").attr("class", "glyphicon glyphicon-remove form-control-feedback");
		});

		$(document).ready(function(){
			$("#frequency").val("{{ $frequency }}");
			$("#notifications").val("{{ $notifications }}");
			if("{{ $onlyIfPending }}" == "yes")
				$("#only-if-pending").prop("checked", true);
		});
	</script>
@stop
