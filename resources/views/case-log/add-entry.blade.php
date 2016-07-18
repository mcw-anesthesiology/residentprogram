<h2>Add entry</h2>

<form role="form" id="case-entry-form" method="post" action="/case_logs">
	{!! csrf_field() !!}
	@include("case-log.pieces.base")
	<section class="case-details">
		@include("case-log.pieces.details")
	</section>
	<button type="submit" class="btn btn-primary center-block">
		<span class="glyphicon glyphicon-plus"></span>
		Add entry
	</button>
</form>
