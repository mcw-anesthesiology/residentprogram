@extends("app")

@section("body")
	<h1>Unsubscribe</h1>
	<div class=".unsub-alert-container"></div>
	<form id="unsub-form" method="POST" action="#">
		{!! csrf_field() !!}
	@if($alum->do_not_contact)
		<p>
			You are successfully unsubscribed from receiving emails from us. We're sorry to see you go!
		</p>
		<button>Resubscribe {{$alum->email}}</button>
	@else
		<button>Unsubscribe {{$alum->email}}</button>
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
				if(response == "success")
					form.empty();
					form.append("{!! csrf_field() !!}");
					form.append()
				else
					appendAlert(response, ".unsub-alert-container");
			}).fail(function(err){
				appendAlert("Sorry, there was a problem unsubscribing you. Please send me an email at {{ $ADMIN_EMAIL }} and I will make sure you are unsubscribed.", ".unsub-alert-container");
			});
		});
	</script>
@stop
