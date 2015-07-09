@extends("app")

@section("body")
	<h2 class="sub-header">Request Evaluation</h2>

	@if($userType == "resident" || $userType == "faculty")
		<div class="form-group">
			<label for="block">Block</label>
			<select class="form-control" id="block">
				<option value="none">Select from all {{ $selectTypes[$userType] }}</option>
				@foreach($blocks as $block)
					<option value="{{ $block->block_name }}">{{ $block->year }} {{ $block->block_name }}</option>
				@endforeach
			</select>
		</div>
	@endif
@stop

@section("script")
	<script>
		function selectBlock(){
			var block = $("#block").val();
			$("#form").html("");
			$.ajax({
				"method": "post",
				"data": "block="+block,
				"url": "request/get-block",
				"success": function(response){
					if(response != "")
						$("#form").html(response);
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
