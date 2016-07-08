@if($noEvaluations)
	<h2>You have no faculty evaluations</h2>
@else
<h2 class="sub-header">Faculty Evaluations</h2>
<div class="table-responsive">
	<table class="table table-striped" id="faculty-faculty-evaluations-table" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Evaluation Date</th>
			</tr>
		</thead>
	</table>
</div>
@endif
