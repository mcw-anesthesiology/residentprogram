@extends("app")

@section("head")
	<style>
		.footer{ display: none }
	</style>
@stop

@section("body")
	<h3 class="sub-header">Problems? Questions? Suggestions?</h3>
	<p>Please fill out the form below or email me at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a> and I will get back to you!</p>
	<div id="form">
		<div class="form-group">
			<label for="subject">What is this about?</label>
			<input type="text" class="form-control" id="subject" name="subject" />
		</div>
		<div class="form-group">
			<label for="body">What's wrong?</label>
			<textarea class="form-control" id="body" name="body" rows="8"></textarea>
		</div>
		<button class="btn btn-primary" type="submit" id="submit">Submit</button>
	</form>
@stop
