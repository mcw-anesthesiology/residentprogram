<h3>{{ $title }}</h3>

<section class="case-info">
	<div class="row">
		<div class="col-md-4">
			<div class="form-group">
				<label class="containing-label">Location
					<select class="form-control" name="location_id">
@foreach($locations as $location)
						<option value="{{ $location->id }}">{{ $location->name }}</option>
@endforeach
					</select>
				</label>
			</div>
		</div>
		<div class="col-md-4">
			<div class="form-group">
				<label class="containing-label">Case Date
					<div class="input-group date datetimepicker">
						<input type="text" class="form-control case-log-case-date" name="case_date" />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
				</label>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<label class="containing-label">Comments
					<textarea class="form-control" name="comment"></textarea>
				</label>
			</div>
		</div>
	</div>
</section>
