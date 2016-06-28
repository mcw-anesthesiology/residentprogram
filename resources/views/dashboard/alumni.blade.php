@extends("app")

@section("body")
	<h1>MCW Alumni</h1>
	<div class="alumni-alert-container"></div>
	<p class="lead">
		Please keep us up to date with your contact info, we'd love to keep in touch!
	</p>
	<p>
		We don't send much, we won't spam your inbox.
	</p>
	<p>
		You can return to this address to update your info at any time. We'll include it again with most emails, so don't worry about forgetting it.
	</p>
	<p>
		<a href="{{ url("/alum/{$alum->update_hash}/subscription") }}">Manage your MCW Anesthesiology Alumni email subscription</a>
	</p>
</div>
<div class="container body-block">
	<div id="alumni-form-container">
		<form class="form" id="alumni-form" role="form" method="POST" action="/alumni/hash/{{ $alum->update_hash }}">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" />
			<div class="form-group">
				<label for="first-name">First name</label>
				<input type="text" class="form-control" id="first-name" name="first_name" value="{{ $alum->first_name }}" placeholder="First name" required />
			</div>
			<div class="form-group">
				<label for="last-name">Last name</label>
				<input type="text" class="form-control" id="last-name" name="last_name" value="{{ $alum->last_name }}" placeholder="Last name" required />
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" name="email" value="{{ $alum->email }}" placeholder="Email" />
			</div>
			<div class="form-group">
				<label for="country">Country</label>
				<select class="form-control crs-country" id="country" data-region-id="state" data-default-value="{{ $alum->country or 'United States' }}" name="country"></select>
			</div>
			<div class="form-group">
				<label for="address">Address</label>
				<input type="text" class="form-control" id="address" name="address" value="{{ $alum->address }}" placeholder="Address" />
			</div>
			<div class="form-group">
				<label for="city">City</label>
				<input type="text" class="form-control" id="city" name="city" value="{{ $alum->city }}" placeholder="City" />
			</div>
			<div class="form-group">
				<label for="state">State / Region</label>
				<select class="form-control" id="state" name="state" data-default-value="{{ $alum->state or 'Wisconsin' }}"></select>
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary">Save information</button>
			</div>
		</form>
	</div>
@stop

@section("script")
	<script>
		$("#alumni-form").submit(function(event){
			event.preventDefault();
			var action = $(this).attr("action");
			var formData = $(this).serialize();
			var errorText = "Sorry, there was a problem saving your information. " +
				"If this continues to happen, please send me your information " +
				"directly at jmischka@mcw.edu and I will make sure it's properly saved. Thank you!";

			$.ajax({
				url: action,
				method: "POST", // PATCH
				data: formData
			}).done(function(response){
				console.log(response);
				if(response === "success")
					$("#alumni-form-container").html('<p class="lead">Your information was saved successfully. Thank you!</p>')
				else
					appendAlert(errorText, ".alumni-alert-container");

			}).fail(function(err){
				appendAlert(errorText, ".alumni-alert-container");
			});
		});
	</script>
@stop
