@extends("app")

@section("blockless-body")

<div class="container body-block">
	<h1>User settings</h1>
	<div class="row">
		<div class="col-sm-12">
			<form v-cloak role="form" @submit="handleSettingsSubmit">
				<div v-for="(options, setting) in USER_SETTINGS" :key="setting"
						class="form-group">
					<label class="containing-label">
						@{{ displaySetting(setting) }}
						<select class="form-control" :name="setting"
								:value="getUserSetting(setting)">
							<option v-for="option of options" :key="option"
									:value="option">
								@{{ displaySetting(option) }}
							</option>
						</select>
					</label>
					<small v-if="SETTINGS_HELP[setting]">
						@{{ SETTINGS_HELP[setting] }}
					</small>
				</div>
				<button type="submit" class="btn btn-primary center-block">
					Save settings
				</button>
			</form>
		</div>
	</div>

	<div class="row">
@if ($user->isType(['faculty', 'resident']))
		<div class="col-md-6">
			<form role="form" @submit="handleNotificationsUpdate">
				<h3 class="sub-header">Notifications</h3>
				<div class="form-group">
					<label class="containing-label">
						Email notifications for new evaluations
						<select class="form-control" v-model="notifications">
							<option value="yes">Yes, send me emails for new evaluations</option>
							<option value="no">No, don't send me emails</option>
						</select>
					</label>
				</div>
				<button type="submit" class="btn btn-primary center-block">
					Update notification preferences
				</button>
			</form>
		</div>
@endif

@if($user->type == "faculty")
		<div class="col-md-6">
			<form role="form" @submit="handleRemindersUpdate">
				<h3 class="sub-header">Reminders</h3>
				<div class="form-group">
					<label class="containing-label">
						Frequency
						<select class="form-control" v-model="reminder_frequency">
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="biweekly">Biweekly</option>
							<option value="none">None</option>
						</select>
					</label>
				</div>
				<div class="form-group">
					<label>
						<input type="checkbox" v-model="remind_only_if_pending" />
						Only send reminders if I have pending evaluations
					</label>
				</div>
				<button type="submit" class="btn btn-primary center-block">
					Update reminder preferences
				</button>
			</form>
		</div>
@endif
	</div>

	<alert-list v-model="alerts"></alert-list>
</div>

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
		<button type="submit" class="btn btn-primary center-block">
			Update Password
		</button>
	</form>
</div>
@stop

@section("script")
	<script src="{{ elixir('js/vue-user.js') }}"></script>
	<script>
		$("#new-password-confirm").keyup(function(){
			if($("#new-password").val() == $("#new-password-confirm").val())
				$("#confirm-icon").attr("class", "glyphicon glyphicon-ok form-control-feedback");
			else
				$("#confirm-icon").attr("class", "glyphicon glyphicon-remove form-control-feedback");
		});

		var propsData = {
			user: {!! $user->toJson() !!}
		};

		createUserSettingsPage('main', propsData);
	</script>
@stop
