@extends("app")

@section("body")
	<h2 class="sub-header">Request Evaluation</h2>

	@if($user->type == "resident" || $user->type == "faculty")
		<div class="form-group">
			<label for="block">Filter By Block</label>
			<select class="form-control select2" id="block">
				<option value="0">Select from all {{ $selectTypes[$user->type] }}</option>
				@foreach($blocks as $block)
					@if($block->assignments->contains("user_id", $user->id))
						<option value="{{ $block->id }}">{{ $block->year }} {{ $block->block_name }}</option>
					@endif
				@endforeach
			</select>
		</div>
	@endif
	<form id="form" role="form" action="#" method="POST">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
		@if($user->type != "resident")
			<div class="form-group">
				<label for="resident">Resident/Fellow</label>
				<select class="form-control request-select" name="subject_id" id="resident" required>
				</select>
			</div>
		@endif

		@if($user->type != "faculty")
			<div class="form-group">
				<label for="faculty">Faculty</label>
				<select class="form-control request-select" name="evaluator_id" id="faculty" required>
				</select>
			</div>
		@endif

		<div class="form-group">
			<label for="evaluation-form">Evaluation Form</label>
			<select class="form-control request-select" name="form_id" id="evaluation-form" required>
				@foreach($forms as $form)
					<option value="{{ $form->id }}">{{ $form->title }}</option>
				@endforeach
			</select>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>

</div>
<div class="container body-block">
	<h3 class="sub-header">Block Information</h3>
<?php
	if($user->type == "resident")
		$selectUserType = "faculty";
	elseif($user->type == "faculty")
		$selectUserType = "interns, residents, and fellows";
?>
	@if($user->type != "admin")
	<p>
		Selecting a block is used to filter the list of {{ $selectUserType }} to others who are scheduled in the same locations as you.
		If the doctor you are looking for is missing after selecting a block, or an entire block is missing for you from the list, please select "select from all" for the block.
		You will then be able to select from the entire list of {{ $selectUserType }}.
	</p>
	@endif
@stop

@section("script")
	<script>
		@if(isset($requestFaculty))
			var faculty = $.parseJSON('{!! $requestFaculty !!}');
		@endif
		@if(isset($requestResidents))
			var residents = $.parseJSON('{!! $requestResidents !!}')
		@endif

		var type = "{{ $user->type }}";

		function selectBlock(){
			if($("#block").length)
				var block = $("#block").val();
			else
				var block = 0;
			if(type == "resident" || type == "admin"){
				var facultySelect = document.getElementById("faculty");
				while(facultySelect.firstChild)
					facultySelect.removeChild(facultySelect.firstChild);
				if(typeof(faculty[block]) != "undefined"){
					for(var i = 0; i < faculty[block].length; i++){
						var option = document.createElement("option");
						option.value = faculty[block][i].id;
						option.textContent = faculty[block][i].name;
						facultySelect.appendChild(option);
					}
				}
				$("#faculty").val(null).select2({
					placeholder: "Select Faculty"
				});
			}
			if(type == "faculty" || type == "admin"){
				var residentSelect = document.getElementById("resident");
				while(residentSelect.firstChild)
					residentSelect.removeChild(residentSelect.firstChild);
				if(typeof(residents[block]) != "undefined"){
					for(var i = 0; i < residents[block].length; i++){
						var option = document.createElement("option");
						option.value = residents[block][i].id;
						option.textContent = residents[block][i].name;
						residentSelect.appendChild(option);
					}
				}
				$("#resident").val(null).select2({
					placeholder: "Select Resident/Fellow"
				});
			}
		}

		$("#block").change(selectBlock);

		$(document).ready(function(){
			$("#block option:eq(1)").prop("selected", true).trigger("change");
			selectBlock();
			$("#evaluation-form").val(null).select2({
				placeholder: "Select Form"
			});
		});

		function checkSelectValues(){
			var optionsSelected = true;
			$(".request-select").each(function(){
				if($(this).val() == null){
					optionsSelected = false;
				}
			});
			if(!optionsSelected){
				alert("Please complete all selections");
			}
			return optionsSelected;
		}

		$("#form").submit(checkSelectValues);

	</script>
@stop
