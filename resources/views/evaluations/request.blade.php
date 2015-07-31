@extends("app")

@section("body")
	<h2 class="sub-header">Request Evaluation</h2>

	@if($user->type == "resident" || $user->type == "faculty")
		<div class="form-group">
			<label for="block">Block</label>
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
				<select class="form-control request-select select2" name="subject_id" id="resident">
				</select>
			</div>
		@endif

		@if($user->type != "faculty")
			<div class="form-group">
				<label for="faculty">Faculty</label>
				<select class="form-control request-select select2" name="evaluator_id" id="faculty">
				</select>
			</div>
		@endif

		<div class="form-group">
			<label for="evaluation-form">Evaluation Form</label>
			<select class="form-control request-select select2" name="form_id" name="evaluation-form">
				@foreach($forms as $form)
					<option value="{{ $form->id }}">{{ $form->title }}</option>
				@endforeach
			</select>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
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
				$("#faculty").trigger("change");
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
				$("#resident").trigger("change");
			}
		}

		$("#block").change(selectBlock);

		$(document).ready(function(){
			$("#block option:eq(1)").prop("selected", true).trigger("change");
			selectBlock();
		});

		function checkSelectValues(){
			var optionsSelected = true;
			$(".request-select").each(function(){
				if($(this).val() == -1 || $(this).val() == "-1"){
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
