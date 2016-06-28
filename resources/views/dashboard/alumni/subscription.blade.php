@extends("app")

@section("head")
	<style>
		.jumbotron {
			background-color: white;
		}

		#unsub-button {
			white-space: normal;
		}
	</style>
@stop

@section("body")
	<div class="jumbotron">

		<h1>MCW Alumni Subscription</h1>
		<form id="unsub-form" method="POST" action="/alumni/subscription/{{ $alum->update_hash }}">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" />
	@if($alum->do_not_contact)
			<p>
				You are successfully unsubscribed from receiving emails from us. We're sorry to see you go!
			</p>
			<input type="hidden" id="unsub-action" name="do_not_contact" value="0" />
			<button type="submit" id="unsub-button" class="btn btn-lg btn-success"><span class="glyphicon glyphicon-plus"></span> Resubscribe {{ $alum->email }}</button>
	@else
			<p>
				Are you sure you would like to unsubscribe from all alumni contact from MCW Anesthesiology?
			</p>
			<input type="hidden" id="unsub-action" name="do_not_contact" value="1" />
			<button type="submit" id="unsub-button" class="btn btn-lg btn-warning"><span class="glyphicon glyphicon-remove"></span> Unsubscribe {{ $alum->email }}</button>
	@endif
		</form>
	</div>
@stop

@section("script")
	<script>
		$("#unsub-form").submit(function(event){
			event.preventDefault();
			var form = $(this);
			var target = form.attr("action");
			var formData = form.serialize();
			$.ajax({
				url: target,
				method: "POST", // PATCH
				data: formData
			}).done(function(response){
				if(response === "success"){
					if($("#unsub-action").val() === "1"){
						form.find("p").text("You are successfully unsubscribed from receiving alumni emails from us. We're sorry to see you go!");
						form.find("#unsub-action").val(0);
						form.find("#unsub-button").removeClass("btn-warning").addClass("btn-success")
							.html("<span class='glyphicon glyphicon-plus'></span> Resubscribe {{ $alum->email }}");
					}
					else {
						form.find("p").text("Thanks for coming back to us!");
						form.find("#unsub-action").val(1);
						form.find("#unsub-button").removeClass("btn-success").addClass("btn-warning")
							.html("<span class='glyphicon glyphicon-remove'></span> Unsubscribe {{ $alum->email }}");
					}
				}
				else {
					appendAlert("Sorry, there was a problem altering your subscription. Please send me an email at {{ $ADMIN_EMAIL }} and I will make sure it's taken care of.", ".top-alert-container");
				}
			}).fail(function(err){
				appendAlert("Sorry, there was a problem altering your subscription. Please send me an email at {{ $ADMIN_EMAIL }} and I will make sure it's taken care of.", ".top-alert-container");
			});
		});
	</script>
@stop
