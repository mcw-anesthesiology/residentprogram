@extends("app")

@section("head")
	<style>
		.intro-container {
			padding: 40px;
		}

		.intro-container h1 {
			margin-bottom: 30px;
		}

		.intro-container p {
			margin-bottom: 25px;
		}

		.intro-container > a {
			display: block;
			margin-top: 40px;
		}

		.submit-container {
			text-align: center;
			margin-top: 30px;
		}

		.submit-container img {
			width: 50px;
			height: 50px;
		}

		.glyph-container {
			text-align: center;
			height: 100%;
			padding: 20px;
		}

		.glyphicon {
			vertical-align: middle;
			font-size: 36px;
		}

		hr {
			margin: 40px;
		}

		.success-lead {
			padding: 20px;
		}
	</style>
@stop

@section("body")
	<div class="intro-container">
		<h1>MCW Anesthesiology Alumni</h1>
		<div class="alumni-alert-container"></div>
		<p class="lead">
			Please keep us up to date with your contact info, we'd love to keep in touch!
		</p>
		<p>
			We don't send much, you don't have to worry about us spamming your inbox.
		</p>
		<p>
			You can return to this address to update your info at any time. We'll include it again with most emails, so don't worry about forgetting it.
		</p>
		<a href="{{ url("/alum/{$alum->update_hash}/subscription") }}">Manage your MCW Anesthesiology Alumni email subscription</a>
	</div>
</div>
<div class="container body-block">
	<div id="alumni-form-container">
		<form class="form" id="alumni-form" role="form" method="POST" action="/alumni/hash/{{ $alum->update_hash }}">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" />
			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-user"></span>
				</div>
				<div class="col-md-5 col-sm-6">
					<div class="form-group">
						<label for="first-name">First name</label>
						<input type="text" class="form-control" id="first-name" name="first_name" value="{{ $alum->first_name }}" placeholder="First name" required />
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<div class="form-group">
						<label for="last-name">Last name</label>
						<input type="text" class="form-control" id="last-name" name="last_name" value="{{ $alum->last_name }}" placeholder="Last name" required />
					</div>
				</div>
			</div>

			<hr />
			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-send"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" class="form-control" id="email" name="email" value="{{ $alum->email }}" placeholder="Email" />
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label for="phone">Phone</label>
						<input type="tel" class="form-control" id="phone" name="phone" value="{{ $alum->phone }}" placeholder="Phone number" />
					</div>
				</div>
			</div>

			<hr />
			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-briefcase"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<div class="form-group">
						<label for="employer">Employer</label>
						<input type="text" class="form-control" id="employer" name="employer" value="{{ $alum->employer }}" placeholder="Employer" />
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label for="country">Country</label>
						<select class="form-control crs-country" id="country" data-region-id="state" data-default-value="{{ $alum->country or 'United States' }}" name="country"></select>
					</div>
				</div>
			</div>

			<hr />
			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-envelope"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<div class="form-group">
						<label for="address">Address</label>
						<input type="text" class="form-control" id="address" name="address" value="{{ $alum->address }}" placeholder="Address" />
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label for="address-2">Address 2</label>
						<input type="text" class="form-control" id="address-2" name="address_2" value="{{ $alum->address_2 }}" placeholder="P.O. box number, apartment number, unit number" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-md-offset-2 col-sm-6">
					<div class="form-group">
						<label for="city">City</label>
						<input type="text" class="form-control" id="city" name="city" value="{{ $alum->city }}" placeholder="City" />
					</div>
				</div>
				<div class="col-md-4 col-sm-3">
					<div class="form-group">
						<label for="state">State / Region</label>
						<select class="form-control" id="state" name="state" data-default-value="{{ $alum->state or 'Wisconsin' }}"></select>
					</div>
				</div>
				<div class="col-md-2 col-sm-3">
					<div class="form-group">
						<label for="zip">ZIP Code</label>
						<input type="text" class="form-control" id="zip" name="zip" value="{{ $alum->zip }}" placeholder="ZIP Code" />
					</div>
				</div>
			</div>
			<div class="form-group submit-container">
				<button type="submit" class="btn btn-primary btn-lg">Save information</button>
			</div>
		</form>
	</div>
@stop

@section("script")
	<script>
		$("#alumni-form").submit(function(event){
			event.preventDefault();
			var button = $(this).find("button[type='submit']");
			var action = $(this).attr("action");
			var formData = $(this).serialize();
			var errorText = "Sorry, there was a problem saving your information. " +
				"If this continues to happen, please send me your information " +
				"directly at jmischka@mcw.edu and I will make sure it's properly saved. Thank you!";

			button.prop("disabled", true).addClass("disabled").html('<img src="/img/spin-btn-primary-disabled.gif" alt="Loading spinner icon" />');
			$.ajax({
				url: action,
				method: "POST", // PATCH
				data: formData
			}).done(function(response){
				console.log(response);
				if(response === "success")
					$("#alumni-form-container").html('<div class="row">' +
						'<div class="col-sm-2 glyph-container">' +
							'<span class="glyphicon glyphicon-thumbs-up"></span>' +
						'</div>' +
						'<div class="col-sm-10">' +
							'<p class="lead success-lead">' +
								'Your information was saved successfully. Thank you!' +
							'</p>' +
						'</div>' +
					'</div>');
				else
					appendAlert(errorText, ".alumni-alert-container");

			}).fail(function(err){
				appendAlert(errorText, ".alumni-alert-container");
			});
		});
	</script>
@stop
