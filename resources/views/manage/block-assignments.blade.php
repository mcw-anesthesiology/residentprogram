@extends("app")

@section("body")
	<h3>Upload Block Schedule</h3>
	<form enctype="multipart/form-data" id="form" method="post">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="year">Year</label>
			<select class="form-control" name="year" id="year">
				<option value="new">New Year</option>
				@foreach($years as $year)
					<option value="{{ $year->year }}">{{ $year->year }}</option>
				@endforeach
			</select>
		</div>
		<div class="form-group" id="new-year-group">
			<label for="new-year">Year Name</label>
			<input type="text" class="form-control" name="new_year" id="new-year" />
		</div>
		<div class="form-group">
			<input type="hidden" name="MAX_FILE_SIZE" value="30000000" />
			<label for="schedule">Schedule</label>
			<input type="file" class="form-control" name="schedule" id="schedule" />
		</div>
		<button class="btn btn-primary" type="submit">Submit</button>

	</div>
	<div class="container body-block">
		<div id="block-assignments">
			<div class="form-group">
				<label for="select-year">Year</label>
				<select class="form-control" id="select-year">
					@foreach($years as $year)
						<option value="{{ $year->year }}">{{ $year->year }}</option>
					@endforeach
				</select>
			</div>
			<br />
			<div id="table-container"></div>
		</div>
	</form>
@stop

@section("script")
	<script>
		function loadBlock(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.year = $("#select-year").val();
			$.ajax({
				"url": "/manage/block-assignments/table",
				"method": "post",
				"data": data,
				"success": function(response){
					if(response != ""){
						$("#table-container").html(response);
						var table = $("#table-container .datatable").DataTable({
							"ajax": {
								"url": "/manage/block-assignments/get",
								"type": "post",
								"data": data
							},
							"paging": false,
							"scrollX": true,
							"scrollY": "500px",
							"scrollCollapse": true,
							stateSave: true,
							"columnDefs": [{
								"targets": 0,
								"cellType": "th"
							}]
						});
						new $.fn.DataTable.FixedColumns(table);
					}
				}
			});
		}
		$("#year").change(function(){
			if($(this).val() == "new"){
				$("#new-year").prop("disabled", false);
				$("#new-year-group").show();
			}
			else{
				$("#new-year").prop("disabled", true);
				$("#new-year-group").hide();
			}
		});
		$("#select-year").change(loadBlock);
		$(document).ready(function(){
			$("#year").select2();
			$("#select-year").select2();
			loadBlock();
		});
	</script>
@stop
