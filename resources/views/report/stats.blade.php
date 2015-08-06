@extends("app")

@section("body")
	<div class="form-group col-sm-6">
		<label for="stats-start-date">Start Date</label>
		<input type="text" id="stats-start-date" class="form-control datepicker" />
	</div>
	<div class="form-group col-sm-6">
		<label for="stats-end-date">End Date</label>
		<input type="text" id="stats-end-date" class="form-control datepicker" />
	</div>
	<div class="form-group col-sm-8">
		<select id="stats-user" class="form-control">
			<option value="all">All {{ ucfirst($type) }}</option>
			@foreach($users as $statUser)
				<option value="{{ $statUser->id }}">{{ $statUser->last_name }}, {{ $statUser->first_name }}</option>
			@endforeach
		</select>
	</div>
	<div class="form-group col-sm-4">
		<button type="button" class="btn" id="get-stats">Get Statistics</button>
	</div>
</div>
	<div id="stats"></div>
@stop

@section("script")
	<script>
		$("#get-stats").click(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#stats-start-date").val();
			data.endDate = $("#stats-end-date").val();
			data.user = $("#stats-user").val();
			$.ajax({
				type: "post",
				url: "#",
				data: data,
				success: function(response){
					if(response == -1)
						$("#stats").html("<p>Error retrieving statistics</p>");
					else
						$("#stats").html(response);

					$(".datatable").DataTable();
				}
			});
		});
	</script>
@stop
