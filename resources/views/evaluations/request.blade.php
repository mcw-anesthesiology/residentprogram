@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer; }
	</style>
@stop

@section("body")
	<h2 class="sub-header">Request Evaluation</h2>

	@if($user->type == "resident" || $user->type == "faculty")
		<div class="form-group">
			<label for="block">Block</label>
			<select class="form-control" id="block">
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
				<select class="form-control request-select" name="resident_id" id="resident" required>
				</select>
			</div>
		@endif

		@if($user->type != "faculty")
			<div class="form-group">
				<label for="faculty">Faculty</label>
				<select class="form-control request-select" name="faculty_id" id="faculty" required>
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

	@if($user->type == "resident" && $requestType == "faculty" && $pendingEvalCount > 0)
</div>
<div class="container body-block">
	<h3 class="sub-header">Evaluations in progress</h3>
	<table class="table table-striped" id="pending-faculty-evals" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Faculty</th>
				<th>Started</th>
			</tr>
		</thead>
	</table>
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

	@if($user->type == "resident" && $requestType == "faculty")
		$(".table").on("click", ".view", function(){
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
			window.location.href = "/evaluation/"+requestId;
		});
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

	@if($user->type == "resident" && $requestType == "faculty")
			$("#pending-faculty-evals").DataTable({
				"ajax": "/dashboard/faculty/evaluations",
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});
	@endif

			$("#block option:eq(1)").prop("selected", true).trigger("change");
			selectBlock();
			$("#evaluation-form").val(null).select2({
				placeholder: "Select Form"
			});
			$("#block").select2();
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
