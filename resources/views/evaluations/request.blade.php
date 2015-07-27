@extends("app")

@section("body")
	<h2 class="sub-header">Request Evaluation</h2>

	@if($user->type == "resident" || $user->type == "faculty")
		<div class="form-group">
			<label for="block">Block</label>
			<select class="form-control" id="block">
				<option value="none">Select from all {{ $selectTypes[$user->type] }}</option>
				@foreach($blocks as $block)
					<option value="{{ $block->block_name }}">{{ $block->year }} {{ $block->block_name }}</option>
				@endforeach
			</select>
		</div>
	@endif
	<form id="form" role="form" action="#" method="POST">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
		<div id="form-contents">
		</div>
	</form>
@stop

@section("script")
	<script>
		function selectBlock(){
			var data = {};
			data.block = $("#block").val();
			data._token = "{{ csrf_token() }}";
			$("#form-contents").html("");
			$.ajax({
				"method": "post",
				"data": data,
				"url": "request/get-block",
				"success": function(response){
					if(response != ""){
						$("#form-contents").html(response);
						$(".request-select").select2();
					}
				}
			});
		}

		$("#block").change(selectBlock);

		$(document).ready(function(){
			$("#block option:eq(1)").prop("selected", true);
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
