@extends("app")

@push("stylesheets")
	<style>
		.footer {
			display: none
		}
	</style>
@endpush

@section("body")
	<h1>Contact</h1>

	<p class="lead">
		Please complete the form below or email me at
		<a href="mailto:{{ config("app.admin_email") }}">
			{{ config("app.admin_email") }}
		</a> and I will get back to you as soon as possible.
	</p>

	<form id="form" method="post" action="#">
		{!! csrf_field() !!}
		<div class="form-group">
			<label for="subject">What is this about?</label>
			<input type="text" class="form-control" id="subject" name="subject"
				value="{{ app('request')->input('subject', '') }}"
			/>
		</div>
		<div class="form-group">
			<label for="body">What's wrong?</label>
			<textarea class="form-control" id="body" name="body" rows="8">{{ app('request')->input('body', '') }}</textarea>
		</div>
		<button class="btn btn-primary" type="submit" id="submit">Submit</button>
	</form>
@stop
