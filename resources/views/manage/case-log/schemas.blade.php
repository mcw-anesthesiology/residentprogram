{{--
	TODO: Schema builder
	TODO: Create new details type
 --}}
<h2>Details Schemas <small>Real editors coming soon</small></h2>
@foreach($schemas as $type => $schemas)
<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">{{ strtoupper($type) }}</h3>
	</div>
	<div class="panel-body">
		<div class="row">
			<div class="col-md-6">
				<form role="form" class="case-log-details-schemas-form" action="/case_log_details_schemas" method="post">
					{!! csrf_field() !!}
					<h4 class="sub-header">Update</h4>
					<input type="hidden" name="details_type" value="{{ $type }}" />
					<div class="form-group">
						<label for="case-log-details-schema-{{ $type }}-version">Version</label>
						<input type="number" class="form-control" id="case-log-details-schema-{{ $type }}-version" name="version" value="{{ $newVersions[$type] }}" readonly />
					</div>
					<div class="form-group">
						<label for="case-log-details-schema-{{ $type }}-schema">Schema</label>
						<textarea class="form-control case-log-details-schema-schema" id="case-log-details-schema-{{ $type }}-schema" name="schema" rows="15"></textarea>
					</div>
					<button type="submit" class="btn btn-primary center-block">Update schema</button>
				</form>
			</div>
			<div class="col-md-6 view-case-log-details-schema">
				<h4 class="sub-header">View</h4>
				<div class="form-group">
					<label for="case-log-details-schemas-version-{{ $type }}">Version</label>
					<select class="form-control case-log-details-schema-version" id="case-log-details-schema-version-{{ $type }}" data-type="{{ $type }}">
	@foreach($schemas->keys()->sort(function($a, $b){ if($a == $b){ return 0; } return ($a < $b) ? 1 : -1; }) as $version)
						<option>{{ $version }}</option>
	@endforeach
					</select>
				</div>
				<div class="form-group">
					<label for="case-log-details-schema-{{ $type }}-old-schema">Schema</label>
					<textarea class="form-control case-log-details-schema-schema" id="case-log-details-schema-{{ $type }}-old-schema" name="schema" rows="15" readonly>{!! json_encode($schemas->sortByDesc("version")->first()->schema, JSON_PRETTY_PRINT) !!}</textarea>
				</div>
			</div>
		</div>
	</div>
</div>
@endforeach
