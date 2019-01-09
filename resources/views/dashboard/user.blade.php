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
	<h3 class="sub-header">Password</h3>
	<p class="lead">
		Password management is now done through the unified MCW Anesthesiology Authentication platform,
		please log in there to change your current password, or to request a reset.
	</p>
	<p class="text-center">
		<a href="https://auth.mcw-anesthesiology.tech/login" class="btn btn-lg btn-primary">
			Take me there
		</a>
	</p>
</div>
@stop

@section("script")
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
