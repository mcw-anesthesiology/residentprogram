<section class="watched-form">
	<div class="row">
		<div class="col-md-6">
			<label for="{{$idPrefix}}-watched-form-user">User</label>
			<select class="form-control select2" id="{{$idPrefix}}-watched-form-user" name="user_id" style="width: 100%;">
@foreach($userGroups as $groupName => $userGroup)
				<optgroup label="{{$groupName}}">
	@foreach($userGroup as $user)
					<option value="{{$user->id}}">{{$user->full_name}}</option>
	@endforeach
				</optgroup>
@endforeach
			</select>
		</div>
		<div class="col-md-6">
			<label for="{{$idPrefix}}-watched-form-form">Form</label>
			<select class="form-control select2" id="{{$idPrefix}}-watched-form-form" name="form_id" style="width: 100%;">
@foreach($formGroups as $groupName => $formGroup)
				<optgroup label="{{$groupName}}">
	@foreach($formGroup as $form)
					<option value="{{$form->id}}">{{$form->title}}</option>
	@endforeach
				</optgroup>
@endforeach
			</select>
		</div>
	</div>
</section>
