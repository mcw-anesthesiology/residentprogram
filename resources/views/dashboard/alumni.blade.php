@extends("app")

@section("body")
	{{-- TODO --}}
	<div>
		<form class="form" id="alumni-form" role="form" method="post" action="#">
			<div class="form-group">
				<label for="first-name">First name</label>
				<input type="text" class="form-control" id="first-name" name="first_name" value="{{ $alum->first_name }}" placeholder="First name" required />
			</div>
			<div class="form-group">
				<label for="last-name">Last name</label>
				<input type="text" class="form-control" id="last-name" name="last_name" value="{{ $alum->last_name }}" placeholder="Last name" required />
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
				<button type="submit">Save information</button>
			</div>
		</form>
	</div>
@stop

@section("script")
	<script>
		$("#alumni-form").submit(function(event){
			event.preventDefault();

			var formData = $(this).serialize();

			$.post("#", formData, function(response){

			}).fail(function(err){
				
			});
		});
	</script>
@stop
