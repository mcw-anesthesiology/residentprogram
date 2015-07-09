@if($user->type != "resident")
	<div class="form-group">
		<label for="resident">Resident/Fellow</label>
		<select class="form-control request-select" name="resident">
			<option value="-1">Select Resident</option>
			@foreach($residents as $resident)
				<option value="{{ $resident->id }}">{{ $resident->last_name }}, {{ $resident->first_name }}</option>
			@endforeach
		</select>
	</div>
@endif

@if($user->type != "faculty")
	<div class="form-group">
		<label for="faculty">Faculty</label>
		<select class="form-control request-select" name="faculty">
			<option value="-1">Select Faculty</option>
			@foreach($faculty as $facultyMember)
				<option value="{{ $facultyMember->id }}">{{ $facultyMember->last_name }}, {{ $facultyMember->first_name }}</option>
			@endforeach
		</select>
	</div>
@endif

<div class="form-group">
	<label for="evaluationForm">Evaluation Form</label>
	<select class="form-control request-select" name="evaluationForm">
		<option value="-1">Select Form</option>
		@foreach($forms as $form)
			<option value="{{ $form->id }}">{{ $form->title }}</option>
		@endforeach
	</select>
</div>
<button type="submit" class="btn btn-default">Submit</button>
