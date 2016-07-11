<h2>Add entry</h2>

<form role="form" id="case-entry-form" method="post" action="/case_logs">
	{!! csrf_field() !!}
	@include("case-log.types." . $detailsType)
	<button type="submit" class="btn btn-primary">
		<span class="glyphicon glyphicon-plus"></span>
		Add entry
	</button>
</form>
