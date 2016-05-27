@extends("app")

@section("head")
	<style>
		h1 {
			font-size: 4em;
		}
		p {
			font-size: 2em;
		}
	</style>
@stop

@section("body")
	<h1>Subscription</h1>
	<form id="unsub-form" method="POST" action="#">
		{!! csrf_field() !!}
	@if($alum->do_not_contact)
		<p>
			You are successfully unsubscribed from receiving emails from us. We're sorry to see you go!
		</p>
		<input type="hidden" id="unsub-action" name="action" value="resubscribe" />
		<button type="submit" id="unsub-button" class="btn btn-lg btn-success"><span class="glyphicon glyphicon-plus"></span> Resubscribe {{ $alum->email }}</button>
	@else
		<p>
			Are you sure you would like to unsubscribe from all alumni contact from MCW?
		</p>
		<input type="hidden" id="unsub-action" name="action" value="unsubscribe" />
		<button type="submit" id="unsub-button" class="btn btn-lg btn-warning"><span class="glyphicon glyphicon-remove"></span> Unsubscribe {{ $alum->email }}</button>
	@endif
	</form>
@stop

@section("script")
	<script>
		$("#unsub-form").submit(function(event){
			event.preventDefault();
			var form = $(this);
			var target = form.attr("action");
			var formData = form.serialize() + "&ajax=true";
			$.post(target, formData, function(response){
				if(response == "unsubscribed"){
					form.find("p").text("You are successfully unsubscribed from receiving alumni emails from us. We're sorry to see you go!");
					form.find("#unsub-action").val("resubscribe");
					form.find("#unsub-button").removeClass("btn-warning").addClass("btn-success")
						.html("<span class='glyphicon glyphicon-plus'></span> Resubscribe {{ $alum->email }}");
				}
				else if(response == "resubscribed"){
					form.find("p").text("Are you sure you would like to unsubscribe from all alumni contact from MCW?");
					form.find("#unsub-action").val("unsubscribe");
					form.find("#unsub-button").removeClass("btn-success").addClass("btn-warning")
						.html("<span class='glyphicon glyphicon-remove'></span> Unsubscribe {{ $alum->email }}");
				}
				else {
					appendAlert(response, ".top-alert-container");
				}
			}).fail(function(err){
				appendAlert("Sorry, there was a problem altering your subscription. Please send me an email at {{ $ADMIN_EMAIL }} and I will make sure it's taken care of.", ".top-alert-container");
			});
		});
	</script>
@stop
