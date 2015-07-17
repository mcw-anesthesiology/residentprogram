@extends("app")

@section("head")
	<style>
		.footer{ display: none }
	</style>
@stop

@section("body")
	<h3 class="sub-header">Problems? Questions? Suggestions?</h3>
	<p>Please fill out the form below or email me at <a href="mailto:jmischka@mcw.edu">jmischka@mcw.edu</a> and I will get back to you!</p>
	<div id="form">
		<div class="form-group">
			<label for="subject">What is this about?</label>
			<input type="text" class="form-control" id="subject" />
		</div>
		<div class="form-group">
			<label for="body">What's wrong?</label>
			<textarea class="form-control" id="body" rows="8"></textarea>
		</div>
		<button class="btn btn-primary" type="button" id="submit">Submit</button>
	</div>
@stop

@section("script")
	<script>
		$("#submit").click(function(){
			var data = {};
			data.subject = $("#subject").val();
			data.body = $("#body").val();
			data._token = "{{ csrf_token() }}";
			if(data.subject != undefined && data.subject.length > 0 && data.body != undefined && data.body.length > 0){
				$.ajax({
					"method": "post",
					"url": "#",
					"data": data,
					"success": function(response){
						if(response == "success"){
							$("#form").html("<h4>Thank you!</h4>");
						}
					}
				});
			}
			else{

			}
		});
	</script>
@stop
