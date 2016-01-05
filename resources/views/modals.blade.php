<!-- Aggregate Report Modal -->
<div class="modal fade bs-aggRpt-modal" role="dialog" aria-labelledby="modalAggRpt" aria-hidden="true" id="aggRptModal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title" id="myModalAggRpt">Generate Aggregate Report</h4>
	  </div>
	  <form class="report" method="post" action="/report/aggregate">
		  {!! csrf_field() !!}
		<div class="modal-body modal-aggRpt report-options">
		  <div class="form-group">
			<label for="startDate">Start Date:</label>
			<input type="text" class="form-control datepicker startDate" id="startDate" name="startDate">
		  </div>
		  <div class="form-group">
			<label for="endDate">End Date:</label>
			<input type="text" class="form-control datepicker endDate" id="endDate" name="endDate">
		  </div>
		  <div class="form-group" style="text-align: center;">
			<button type="button" class="btn lastThreeMonths">Last Three Months</button>
			<button type="button" class="btn lastSixMonths">Last Six Months</button>
		  </div>
		  <div class="form-group">
			<label for="trainingLevelInput">Training Level</label>
			<select class="form-control select2" id="trainingLevelInput" name="trainingLevel" style="width: 100%">
			  <option value="all">All</option>
			  <option value="intern">Intern</option>
			  <option value="ca-1">CA-1</option>
			  <option value="ca-2">CA-2</option>
			  <option value="ca-3">CA-3</option>
			  <option value="fellow">Fellow</option>
			</select>
		  </div>
          <div class="panel panel-default">
              <div class="panel-heading">
                  Milestone Filter
                  <a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Milestones information" class="close report-milestones-info">
    				<span class="glyphicon glyphicon-info-sign"></span>
    			  </a>
              </div>
              <div class="panel-body">
                  <select id="aggregate-milestones" name="milestones[]" multiple>
                @foreach(array_keys($milestoneGroups) as $milestoneGroup)
                    <optgroup label="{{ $milestoneGroup }}">
                    @foreach($milestoneGroups[$milestoneGroup] as $milestone)
                        <option value="{{ $milestone->id }}">{{ $milestone->title }}</option>
                    @endforeach
                    </optgroup>
                @endforeach
                  </select>
              </div>
          </div>
		  <div class="form-group" style="text-align: center;">
			<label for="graphs_yes">Average Graphs Only</label>
			<input type="radio" id="graphs_yes" name="graphs" value="average" checked />
			<br />
			<label for="graphs_all">All Graphs</label>
			<input type="radio" id="graphs_all" name="graphs" value="all" />
			<br />
			<label for="graphs_none">No Graphs</label>
			<input type="radio" id="graphs_none" name="graphs" value="none" />
		  </div>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  <button type="submit" class="btn btn-primary" value="">Generate</button>
		</div>
	  </form>
	</div>
  </div>
</div>

<!-- Specific Report Modal -->
<div class="modal fade bs-specRpt-modal" role="dialog" aria-labelledby="modalSpecRpt" aria-hidden="true" id="specRptModal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title" id="myModalSpecRpt">Generate Specific Report</h4>
	  </div>
	  <form class="report" method="post" action="/report/specific">
		  {!! csrf_field() !!}
		<div class="modal-body">
		  <div class="modal-specRpt">
			<div class="form-group">
		@if($user->type == "faculty")
				<label for="resident">Resident</label>
				<select class="form-control select2" name="resident" style="width: 100%" required>
			@foreach($user->mentees as $resident)
						<option value="{{ $resident->id }}">{{ $resident->full_name }}</option>
			@endforeach
				</select>
		@elseif($user->type == "resident")
				<input type="hidden" name="resident" value="{{ $user->id }}" />
		@elseif($user->type == "admin")
				<label for="resident">Resident</label>
				<select class="form-control select2" name="resident" style="width: 100%" required>
            @foreach(array_keys($residentGroups) as $residentGroupLabel)
                @if(count($residentGroups[$residentGroupLabel]) > 0)
                    <optgroup label="{{ $residentGroupLabel }}">
                    @foreach($residentGroups[$residentGroupLabel] as $resident)
    					<option value="{{ $resident->id }}">{{ $resident->full_name }}</option>
    			    @endforeach
                    </optgroup>
                @endif
            @endforeach
				</select>
		@endif
			</div>
		  </div>
		  <div class="form-group" style="text-align: center;">
			  <button type="button" class="btn" id="addNewSpecificReport">Add Report</button>
		  </div>
          <div class="panel panel-default">
              <div class="panel-heading">
                  Milestone Filter
                  <a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Milestones information" class="close report-milestones-info">
    				<span class="glyphicon glyphicon-info-sign"></span>
    			  </a>
              </div>
              <div class="panel-body">
                  <select id="individual-milestones" name="milestones[]" multiple>
                @foreach(array_keys($milestoneGroups) as $milestoneGroup)
                    <optgroup label="{{ $milestoneGroup }}">
                    @foreach($milestoneGroups[$milestoneGroup] as $milestone)
                        <option value="{{ $milestone->id }}">{{ $milestone->title }}</option>
                    @endforeach
                    </optgroup>
                @endforeach
                  </select>
              </div>
          </div>
		  <div class="form-group" style="text-align: center;">
			<input type="checkbox" id="graphs" name="graphs" value="all" checked />
			<label for="graphs">Generate Graphs</label>
		  </div>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  <button type="submit" class="btn btn-primary" value="">Generate</button>
		</div>
	  </form>
	</div>
  </div>
</div>

<div class="modal fade help-modal" role="dialog" aria-hidden="true" id="help-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Help</h4>
			</div>
			<div class="modal-body">
				@include("help.".$user->type)
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

@if($user->type == "admin")
<!-- Faculty Report Modal -->
<div class="modal fade bs-faculty-report-modal" role="dialog" aria-labelledby="faculty-report-modal-heading" aria-hidden="true" id="faculty-report-modal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title" id="faculty-report-modal-heading">Specific Faculty Report</h4>
	  </div>
	  <form class="report" method="post" action="/report/form">
		  {!! csrf_field() !!}
		<div class="modal-body modal-specFacultyRpt report-options">
		  <div class="form-group">
			<label for="specific-faculty">Faculty</label>
			<select class="form-control select2" id="specific-faculty" name="subject" style="width: 100%;" required>
				@foreach($specificFaculty as $faculty)
					<option value="{{ $faculty->id }}">{{ $faculty->full_name }}</option>
				@endforeach
			</select>
		  </div>
		  <div class="form-group">
			<label for="startDate">Start Date:</label>
			<input type="text" class="form-control datepicker startDate" id="startDate" name="startDate" required>
		  </div>
		  <div class="form-group">
			<label for="endDate">End Date:</label>
			<input type="text" class="form-control datepicker endDate" id="endDate" name="endDate" required>
		  </div>
		  <div class="form-group" style="text-align: center;">
			<button type="button" class="btn lastThreeMonths">Last Three Months</button>
			<button type="button" class="btn lastSixMonths">Last Six Months</button>
		  </div>
		  <div class="form-group">
			<label for="form-id">Form</label>
			<select class="form-control select2" id="form-id" name="form_id" style="width: 100%" required>
		@foreach($facultyForms as $facultyForm)
				<option value="{{ $facultyForm->id }}">{{ $facultyForm->title }}</option>
		@endforeach
			</select>
		  </div>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  <button type="submit" class="btn btn-primary" value="">Generate</button>
		</div>
	  </form>
	</div>
  </div>
</div>

<!-- Form Report Modal -->
<div class="modal fade bs-form-report-modal" role="dialog" aria-labelledby="form-report-modal-heading" aria-hidden="true" id="form-report-modal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title" id="form-report-modal-heading">Form Report</h4>
	  </div>
	  <form class="report" method="post" action="/report/form">
		  {!! csrf_field() !!}
		<div class="modal-body modal-specFacultyRpt report-options">
		  <div class="form-group">
			<label for="form-report-resident">Resident/Fellow</label>
			<select class="form-control select2" id="form-report-resident" name="subject" style="width: 100%;" required>
        @foreach(array_keys($residentGroups) as $residentGroupLabel)
            @if(count($residentGroups[$residentGroupLabel]) > 0)
                <optgroup label="{{ $residentGroupLabel }}">
                @foreach($residentGroups[$residentGroupLabel] as $resident)
                    <option value="{{ $resident->id }}">{{ $resident->full_name }}</option>
                @endforeach
                </optgroup>
            @endif
        @endforeach
			</select>
		  </div>
		  <div class="form-group">
			<label for="startDate">Start Date:</label>
			<input type="text" class="form-control datepicker startDate" id="startDate" name="startDate" required>
		  </div>
		  <div class="form-group">
			<label for="endDate">End Date:</label>
			<input type="text" class="form-control datepicker endDate" id="endDate" name="endDate" required>
		  </div>
		  <div class="form-group" style="text-align: center;">
			<button type="button" class="btn lastThreeMonths">Last Three Months</button>
			<button type="button" class="btn lastSixMonths">Last Six Months</button>
		  </div>
		  <div class="form-group">
			<label for="form-id">Form</label>
			<select class="form-control select2" id="form-id" name="form_id" style="width: 100%" required>
		@foreach(array_keys($residentFormGroups) as $residentFormGroupLabel)
                <optgroup label="{{ ucfirst($residentFormGroupLabel) }}">
            @foreach($residentFormGroups[$residentFormGroupLabel] as $residentForm)
                    <option value="{{ $residentForm->id }}">{{ $residentForm->title }}</option>
            @endforeach
                </optgroup>
		@endforeach
			</select>
		  </div>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  <button type="submit" class="btn btn-primary" value="">Generate</button>
		</div>
	  </form>
	</div>
  </div>
</div>
@endif
