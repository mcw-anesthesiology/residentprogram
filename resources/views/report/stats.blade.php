@extends("app")

@section("head")
	<style>
		.labelless-button {
			margin-top: 25px;
			text-align: center;
		}
	</style>
@stop

@section("body")
	<h2 class="header">{{ ucfirst($type)}} Stats</h2>
	<div id="stats-form" class="form-horizontal report report-options">
		<div class="form-group">
			<div class="col-md-4">
				<label for="stats-start-date">Start Date</label>
				<input type="text" id="stats-start-date" class="form-control datepicker startDate" />
			</div>
			<div class="col-md-4">
				<label for="stats-end-date">End Date</label>
				<input type="text" id="stats-end-date" class="form-control datepicker endDate" />
			</div>
			<div class="col-md-4 labelless-button">
				<button type="button" class="btn lastThreeMonths">Last 3 months</button>
				<button type="button" class="btn lastSixMonths">Last 6 months</button>
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-6">
				<label for="stats-user">{{ ucfirst($type) }}</label>
				<select id="stats-user" class="form-control select2">
					<option value="all">All {{ ucfirst($type) }}</option>
					@foreach($users as $statUser)
						<option value="{{ $statUser->id }}">{{ $statUser->last_name }}, {{ $statUser->first_name }}</option>
					@endforeach
				</select>
			</div>
			<div class="col-md-6 labelless-button">
				<button type="button" class="btn btn-primary" id="get-stats">Get Statistics</button>
			</div>
		</div>
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

			$("#stats").fadeOut(function(){
				$(this).html('<div class="container body-block text-center"><img src="/ajax-loader.gif" /></div>');
				$(this).fadeIn();
			});

			$.post("#", data, function(response){
				if(response == -1){
					$("#stats").fadeOut(function(){
						$(this).html("<p>Error retrieving statistics</p>");
						$(this).fadeIn();
					});
				}
				else{
					$("#stats").fadeOut(function(){
						$(this).html(response);
						$(".datatable").DataTable();
						$(this).fadeIn();
					});
				}
			});
		});
	</script>
@stop
