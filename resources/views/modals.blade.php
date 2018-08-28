@if(!$user->isType('admin'))
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
		@if($user->isType("resident"))
				<input type="hidden" name="resident" value="{{ $user->id }}" />
        @elseif($reportableUserGroups)
                <label for="resident">Trainee</label>
                <select class="form-control select2" name="resident" style="width: 100%" required>
            @foreach($reportableUserGroups as $group => $reportableUsers)
                    <optgroup label="{{ $group }}">
                @foreach($reportableUsers as $trainee)
                        <option value="{{ $trainee->id }}">{{ $trainee->full_name }}</option>
                @endforeach
                    </optgroup>
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
@endif

<div class="modal fade" id="attribution-modal" tabindex="-1" role="dialog" aria-labelledby="attribution-modal-title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="attribution-modal-title">Attributions</h4>
      </div>
      <div class="modal-body">
        <ul>
            <li>
                <a href="https://thenounproject.com/search/?q=pdf&i=749513">
                    <img src="/img/icons/pdf-with-text.svg" alt="PDF Icon" />
                    PDF by Yamini Ahluwalia from the Noun Project
                </a>
            </li>
			<li>
				<a href="https://thenounproject.com/search/?q=csv&i=724849" target="_blank" rel="noreferrer noopener">
					<img src="/img/icons/csv.svg" alt="CSV Icon" />
					CSV File by Plastic Donut from the Noun Project
				</a>
			</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

@stack("modals")
