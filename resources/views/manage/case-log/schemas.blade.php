<h2>Case Log Details Schemas</h2>
<div class="table-responsive">
	<table class="table table-striped" id="case-log-details-schemas-table" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Details type</th>
				<th>Version</th>
				<th></th>
			</tr>
		</thead>
	</table>
</div>

@push("modals")
	<div class="modal fade" id="add-case-log-details-schema-modal" tabindex="-1" role="dialog" aria-labelledby="add-case-log-details-schema-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
		  <form role="form" id="add-case-log-details-schema-form" method="post" action="/case_log_details_schemas">
			{!! csrf_field() !!}
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="add-case-log-details-schema-modal-title">Case Log Schema</h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="case-log-schema-version">Version</label>
					<input type="number" class="form-control" id="case-log-schema-version" name="version" min="1" readonly />
				</div>
				<div class="form-group">
					<label for="case-log-schema-details-type">Type</label>
					<select class="form-control" id="case-log-schema-details-type" name="details_type">
						<option value="raaps">RAAPS</option>
					</select>
				</div>
				<div class="form-group">
					<label for="case-log-schema-schema">Schema</label>
					<textarea class="form-control" id="case-log-schema-schema" name="schema" wrap="soft"></textarea>
					<small>Builder coming soon</small>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span> Add schema</button>
			</div>
		  </form>
	    </div>
	  </div>
	</div>
@endpush
