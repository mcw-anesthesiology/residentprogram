<h2>Add entry</h2>

<form role="form" id="case-entry-form" method="post" action="/case_logs">
	{!! csrf_field() !!}
	@include("case-log.pieces.base")
	<input type="hidden" name="details_schema_id" value="{{ $detailsSchema->id }}" />
	<section class="case-details"></section>
	<button type="submit" class="btn btn-primary center-block">
		<span class="glyphicon glyphicon-plus"></span>
		Add entry
	</button>
</form>
