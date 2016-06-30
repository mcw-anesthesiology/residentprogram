@extends("app")

@section("head")
	<style>
		.advance-accounts-selected-users {
			max-height: 300px;
			overflow-y: auto;
		}

		.advance-accounts-section .row {
			margin-top: 40px;
		}

		.summary-container {
			font-size: 24px;
		}

		.input-group.date .input-group-addon.disabled,
		.input-group.date .glyphicon.disabled {
			cursor: not-allowed;
		}
	</style>
@stop

@section("body")
	<h1>Advance accounts</h1>
	<section class="advance-accounts-section" id="advance-accounts-container">
		<h2 class="sub-header">Advancing users</h2>
		<div class="row">
			<div class="col-md-6 col-lg-3">
				<h3>Intern</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-intern-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-share-alt"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="intern"></ul>
				</section>
			</div>
			<div class="col-md-6 col-lg-3">
				<h3>CA-1</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-ca-1-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-share-alt"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-1s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-1"></ul>
				</section>
			</div>
			<div class="col-md-6 col-lg-3">
				<h3>CA-2</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-ca-2-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-share-alt"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-2s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-2"></ul>
				</section>
			</div>
			<div class="col-md-6 col-lg-3">
				<h3>CA-3</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-ca-3-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-share-alt"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-3s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-3"></ul>
				</section>
			</div>
		</div>
		<section id="advancing-users-summary-container">
			<div class="row summary-container">
				<div class="col-sm-3">
					<span>Advancing users:</span>
				</div>
				<div class="col-sm-9">
					<span id="num-advancing-users"></span>
				</div>
			</div>
			<div class="row" id="advance-run-at-container">
				<div class="col-sm-4 col-sm-offset-1 col-md-offset-2">
					<div class="form-group">
						<label for="advance-run-now-checkbox">Advance time</label>
						<div class="input-group">
							<input type="checkbox" id="advance-run-now-checkbox" name="run_at" value="now" />
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="form-group">
						<label for="advance-run-at">Scheduled advancement time</label>
						<div class="input-group date" id="advance-run-at-group">
							<input type="text" class="form-control" id="advance-run-at" name="run_at" />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-lg btn-primary center-block" id="advance-users-button">
						<span class="glyphicon glyphicon-share-alt"></span> Advance
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="center-block" id="advance-users-alert-container">

					</div>
				</div>
			</div>
		</section>
	</section>
</div>

<div class="container body-block">
	<section class="advance-accounts-section" id="graduate-accounts-container">
		<h2 class="sub-header">Leaving users</h2>
		<div class="row">
			<div class="col-md-4">
				<h3>Intern</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-intern-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="intern"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>CA-1</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-ca-1-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-1s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-1"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>CA-2</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-ca-2-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-2s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-2"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>CA-3</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-ca-3-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-3s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-3"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>Fellow</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-fellow-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected fellows</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="fellow"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>Faculty</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="graduate-faculty-table" width="100%">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-plane"></span></th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected faculty</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="faculty"></ul>
				</section>
			</div>
		</div>
		<section id="graduating-users-summary-container">
			<div class="row summary-container">
				<div class="col-sm-3">
					<span>Leaving users:</span>
				</div>
				<div class="col-sm-9">
					<span id="num-graduating-users"></span>
				</div>
			</div>
			<div class="row" id="graduate-run-at-container">
				<div class="col-sm-4 col-sm-offset-1 col-md-offset-2">
					<div class="form-group">
						<label for="graduate-run-now-checkbox">Leaving time</label>
						<div class="input-group">
							<input type="checkbox" id="graduate-run-now-checkbox" name="run_at" value="now" />
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="form-group">
						<label for="graduate-run-at">Scheduled leaving time</label>
						<div class="input-group date" id="graduate-run-at-group">
							<input type="text" class="form-control" id="graduate-run-at" name="run_at" />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-lg btn-primary center-block" id="graduate-users-button">
						<span class="glyphicon glyphicon-plane"></span> Leave
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="center-block" id="graduate-users-alert-container">

					</div>
				</div>
			</div>
		</section>
	</section>
</div>

<div class="container body-block">
	<section class="advance-accounts-section" id="start-accounts-container">
		<h2 class="sub-header">Starting users</h2>
		<div class="row">
			<div class="col-sm-6 col-md-4">
				<h3>Interns</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-intern-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="intern"></ul>
				</section>
			</div>
			<div class="col-sm-6 col-md-4">
				<h3>CA-1s</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-ca-1-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-1s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-1"></ul>
				</section>
			</div>
			<div class="col-sm-6 col-md-4">
				<h3>CA-2s</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-ca-2-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-2s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-2"></ul>
				</section>
			</div>
			<div class="col-sm-6 col-md-4">
				<h3>CA-3s</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-ca-3-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-3s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-3"></ul>
				</section>
			</div>
			<div class="col-sm-6 col-md-4">
				<h3>Fellows</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-fellow-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="fellow"></ul>
				</section>
			</div>
			<div class="col-sm-6 col-md-4">
				<h3>Faculty</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="start-faculty-table">
						<thead>
							<tr>
								<th><span class="glyphicon glyphicon-ok-circle"></span></th>
								<th>Name</th>
								<th>Status</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="faculty"></ul>
				</section>
			</div>
		</div>
		<section id="starting-users-summary-container">
			<div class="row summary-container">
				<div class="col-sm-3">
					<span>Starting users:</span>
				</div>
				<div class="col-sm-9">
					<span id="num-starting-users"></span>
				</div>
			</div>
			<div class="row" id="start-run-at-container">
				<div class="col-sm-4 col-sm-offset-1 col-md-offset-2">
					<div class="form-group">
						<label for="start-run-now-checkbox">Starting time</label>
						<div class="input-group">
							<input type="checkbox" id="start-run-now-checkbox" name="run_at" value="now" />
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="form-group">
						<label for="start-run-at">Scheduled starting time</label>
						<div class="input-group date" id="start-run-at-group">
							<input type="text" class="form-control" id="start-run-at" name="run_at" />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-lg btn-primary center-block" id="start-users-button">
						<span class="glyphicon glyphicon-ok-circle"></span> Start
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="center-block" id="start-users-alert-container">

					</div>
				</div>
			</div>
		</section>
	</section>
</div>

<div class="container body-block">
	<section id="pending-advancements-container">
		<h2 class="sub-header">Pending advancements</h2>
		<div class="table-responsive">
			<table class="table table-striped" id="pending-advancements-table" width="100%">
				<thead>
					<tr>
						<th>User</th>
						<th>Action</th>
						<th>Scheduled for</th>
						<th></th>
					</tr>
				</thead>
			</table>
		</div>
	</section>

	<div class="modal fade" id="view-user-modal" tabindex="-1" role="dialog" aria-labelledby="view-user-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="view-user-modal-title">View user</h4>
	      </div>
	      <div class="modal-body">
	        <row>
				<img src="" alt="" id="view-user-photo" />
			</row>
			<row>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-name"></span>
				</div>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-email"></span>
				</div>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-type"></span>
				</div>
			</row>
	      </div>
	      <div class="modal-footer">
			<a href="" target="_blank" role="button" class="btn btn-info" id="view-user-view-profile-button"><span class="glyphicon glyphicon-link"></span> View profile</a>
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		var advancingUsers = {};
		var graduatingUsers = {};
		var startingUsers = {};

		var internTable = $("#advance-intern-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "intern",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca1Table = $("#advance-ca-1-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-1",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca2Table = $("#advance-ca-2-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-2",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca3Table = $("#advance-ca-3-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-3",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var internGraduateTable = $("#graduate-intern-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "intern",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca1GraduateTable = $("#graduate-ca-1-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-1",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca2GraduateTable = $("#graduate-ca-2-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-2",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca3GraduateTable = $("#graduate-ca-3-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-3",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var fellowTable = $("#graduate-fellow-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "fellow",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var facultyTable = $("#graduate-faculty-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "faculty",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var internStartTable = $("#start-intern-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "intern",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca1StartTable = $("#start-ca-1-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-1",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca2StartTable = $("#start-ca-2-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-2",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca3StartTable = $("#start-ca-3-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-3",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var fellowStartTable = $("#start-fellow-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "fellow",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var facultyStartTable = $("#start-faculty-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "faculty",
					"status[]": ["inactive", "pending"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: "status", render: renderAccountStatus},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var pendingAdvancementsTable = $("#pending-advancements-table").DataTable({
			ajax: {
				url: "/advancements",
				data: {
					user: true,
					complete: false
				},
				dataSrc: ""
			},
			columns: [
				{data: "user.full_name"},
				{data: null, render: function(advancement){
					if(advancement.advanced_field === "training_level"){
						if(advancement.advanced_value.indexOf("ca-") !== -1)
							return "Advance to " + advancement.advanced_value.toUpperCase();
						else
							return "Advance to " + advancement.advanced_value;
					}
					else if(advancement.advanced_field === "status"){
						if(advancement.advanced_value === "inactive")
							return "Disable account";
						else
							return "Enable account";
					}
					else
						return "Unknown";
				}},
				{data: "run_at", render: renderTableDate, createdCell: createDateTimeCell},
				{data: null, orderable: false, searchable: false, render: function(advancement, type){
					return '<button type="button" class="btn btn-xs btn-danger cancel-advancement-button" '
						+ 'data-id="' + advancement.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> '
						+ 'Cancel</button>';
				}}
			],
			order: [[2, "asc"]]
		});

		var advancingTables = [
			internTable,
			ca1Table,
			ca2Table,
			ca3Table
		];

		var graduatingTables = [
			internGraduateTable,
			ca1GraduateTable,
			ca2GraduateTable,
			ca3GraduateTable,
			fellowTable,
			facultyTable
		];

		var startingTables = [
			internStartTable,
			ca1StartTable,
			ca2StartTable,
			ca3StartTable,
			fellowStartTable,
			facultyStartTable
		];

		$("#advance-accounts-container").on("change", ".advance-user-checkbox", selectAdvancingUser);
		$("#graduate-accounts-container").on("change", ".advance-user-checkbox", selectGraduatingUser);
		$("#start-accounts-container").on("change", ".advance-user-checkbox", selectStartingUser);

		var nextDefaultAdvancementDate = moment();
		if(nextDefaultAdvancementDate.month() >= 6)
			nextDefaultAdvancementDate.add(1, "year");
		nextDefaultAdvancementDate.month(6).date(1).hour(4).minute(0).second(0);

		$("#advance-run-at-group, #graduate-run-at-group, #start-run-at-group").datetimepicker({
			useCurrent: false,
			defaultDate: nextDefaultAdvancementDate,
			minDate: moment(),
			stepping: 60,
			format: "M/D/Y h A"
		});

		$("#advance-run-now-checkbox, #graduate-run-now-checkbox, #start-run-now-checkbox").bootstrapSwitch({
			onText: "Now",
			offText: "Scheduled"
		});

		$("#advance-run-now-checkbox").on("switchChange.bootstrapSwitch", function(event, state){
			if(state){
				$("#advance-run-at-group").find("*")
					.prop("disabled", true).addClass("disabled");
			}
			else {
				$("#advance-run-at-group").find("*")
					.prop("disabled", false).removeClass("disabled");
			}
		});
		$("#graduate-run-now-checkbox").on("switchChange.bootstrapSwitch", function(event, state){
			if(state){
				$("#graduate-run-at-group").find("*")
					.prop("disabled", true).addClass("disabled");
			}
			else {
				$("#graduate-run-at-group").find("*")
					.prop("disabled", false).removeClass("disabled");
			}
		});
		$("#start-run-now-checkbox").on("switchChange.bootstrapSwitch", function(event, state){
			if(state){
				$("#start-run-at-group").find("*")
					.prop("disabled", true).addClass("disabled");
			}
			else {
				$("#start-run-at-group").find("*")
					.prop("disabled", false).removeClass("disabled");
			}
		});

		// $(document).on("click", ".view-user-button", function(){
		// 	// TODO
		// });

		$("#advance-users-button, #graduate-users-button, #start-users-button").click(function(){
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");

			var runAt, runAtGroup, advancedField, advancedValue, alertContainer,
				users, userTables, container;
			switch($(this).attr("id")){
				case "advance-users-button":
					container = "#advance-accounts-container";
					runAt = $("#advance-run-at");
					runAtGroup = $("#advance-run-at-group");
					advancedField = "training_level";
					advancedValue = null;
					alertContainer = "#advance-users-alert-container";
					users = advancingUsers;
					userTables = advancingTables;
					break;
				case "graduate-users-button":
					container = "#graduate-accounts-container";
					runAt = $("#graduate-run-at");
					runAtGroup = $("#graduate-run-at-group");
					advancedField = "status";
					advancedValue = "inactive";
					alertContainer = "#graduate-users-alert-container";
					users = graduatingUsers;
					userTables = graduatingTables.concat(advancingTables, startingTables);
					break;
				case "start-users-button":
					container = "#start-accounts-container";
					runAt = $("#start-run-at");
					runAtGroup = $("#start-run-at-group");
					advancedField = "status";
					advancedValue = "active";
					alertContainer = "#start-users-alert-container";
					users = startingUsers;
					userTables = startingTables.concat(advancingTables, graduatingTables);
					break;
			}

			var runNow = runAt.prop("disabled");
			var scheduledRunAt = runAtGroup
				.data("DateTimePicker").date().format("Y-MM-DD HH:mm:ss");

			var data = {
				_token: "{{ csrf_token() }}",
				advanced_field: advancedField,
				advanced_value: advancedValue,
				run_at: runNow ? "now" : scheduledRunAt,
				user_ids: Object.keys(users)
			};

			$.ajax({
				url: "/advancements/many",
				method: "POST",
				data: data
			}).done(function(response){
				var advancementResult = runNow ? "run" : "scheduled";
				if(response.successes.length > 0){
					response.successes.forEach(function(userId){
						highlightSelectedUser(userId, container, "success");
						deselectUser(userId, container, users);
					});
					if(response.errors.length === 0 && response.failedRuns.length === 0){
						appendAlert("All advancements were successfully " + advancementResult,
							alertContainer, "success");
					}
					else {
						appendAlert("Some advancements were successfully " + advancementResult,
							alertContainer, "success");
					}
					if(runNow){
						userTables.forEach(function(table){
							table.ajax.reload();
						});
					}
				}
				if(response.failedRuns.length > 0){
					response.failedRuns.forEach(function(userId){
						highlightSelectedUser(userId, container, "warning");
					});
					appendAlert("Some advancements were successfully created, but not run successfully",
						alertContainer, "warning");
				}
				if(response.errors.length > 0){
					response.errors.forEach(function(userId){
						highlightSelectedUser(userId, container, "danger");
					});
					appendAlert("Some advancements were not successfully created or " + advancementResult,
						alertContainer);
				}
				pendingAdvancementsTable.ajax.reload();
			}).fail(function(err){
				Object.keys(advancingUsers).forEach(function(userId){
					highlightSelectedUser(userId, container, "danger");
				});
				appendAlert("There was a problem advancing users. No users were advanced",
					alertContainer);
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#pending-advancements-table").on("click", ".cancel-advancement-button", function(){
			$("#pending-advancements-table").find(".confirm-cancel-advancement-button")
				.removeClass("confirm-cancel-advancement-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Cancel');
			$(this).addClass("confirm-cancel-advancement-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Confirm cancel')
		});

		$("#pending-advancements-table").on("click", ".confirm-cancel-advancement-button", function(){
			var advancementId = $(this).data("id");
			var data = {
				_token: "{{ csrf_token() }}",
				_method: "DELETE"
			};
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");

			$.ajax({
				url: "/advancements/" + advancementId,
				method: "POST", // DELETE
				data: data
			}).done(function(response){
				if(response === "success")
					pendingAdvancementsTable.ajax.reload();
				else {
					button.prop("disabled", false).removeClass("disabled");
					appendAlert("There was a problem cancelling the advancement", "#pending-advancements-container");
				}
			}).fail(function(){
				button.prop("disabled", false).removeClass("disabled");
				appendAlert("There was a problem cancelling the advancement", "#pending-advancements-container");
			});
		});

		function selectAdvancingUser(){
			selectUser($(this), "#advance-accounts-container", advancingUsers);
			updateUserCount($("#num-advancing-users"), advancingUsers);
		}

		function selectGraduatingUser(){
			selectUser($(this), "#graduate-accounts-container", graduatingUsers);
			updateUserCount($("#num-graduating-users"), graduatingUsers);
		}

		function selectStartingUser(){
			selectUser($(this), "#start-accounts-container", startingUsers);
			updateUserCount($("#num-starting-users"), startingUsers);
		}

		function selectUser(c, container, collection){
			var type;
			if(c.data("type") === "resident")
				type = c.data("trainingLevel");
			else
				type = c.data("type");

			if(c.prop("checked")){
				collection[c.data("id")] = {
					id: c.data("id"),
					name: c.data("name"),
					email: c.data("email"),
					photo: c.data("photo"),
					type: c.data("type"),
					training_level: c.data("trainingLevel")
				};
				var listGroup = $(container).find(".advance-accounts-selected-users[data-type='" + type + "']");
				listGroup.find(".selected-user.list-group-item-success").remove();
				listGroup.append('<li class="list-group-item selected-user" data-id="' + c.data("id") + '">' + c.data("name") + '</li>');
			}
			else {
				delete collection[c.data("id")];
				$(container).find(".selected-user[data-id='" + c.data("id") + "']").remove();
			}
		}

		function deselectUser(userId, container, collection){
			$(container).find(".advance-user-checkbox[data-id='" + userId + "']").prop("checked", false);
			delete collection[userId];
			updateUserCount(container, collection);
		}

		function highlightSelectedUser(userId, container, context){
			$(".selected-user[data-id='" + userId + "']")
				.addClass("list-group-item-" + context);
		}

		function updateUserCount(container, collection){
			$(container).text(Object.keys(collection).length);
		}

		function renderAdvanceCheckbox(user){
			return '<input type="checkbox" class="advance-user-checkbox" '
				+ 'data-id="' + user.id + '" data-name="' + user.full_name + '" data-email="' + user.email + '" '
				+ 'data-photo="' + user.photo_path + '" data-type="' + user.specific_type + '" '
				+ 'data-training-level="' + user.training_level + '" '
				+ 'name="users[]" value="' + user.id + '" />';
		}

		function renderViewButton(user){ // TODO: Enable
			return '<button type="button" class="btn btn-xs btn-info view-user-button disabled" '
			 	+ 'data-id="' + user.id + '" data-name="' + user.full_name + '" data-email="' + user.email + '" '
				+ 'data-photo="' + user.photo_path + '" data-type="' + user.specific_type + '" '
				+ 'data-training-level="' + user.training_level + '" title="Coming soon" disabled>'
				+ '<span class="glyphicon glyphicon-user"></span> View</button>';
		}

		function renderAccountStatus(status){
			var labelContext;
			switch(status){
				case "inactive":
					labelContext = "label-danger";
					break;
				case "pending":
					labelContext = "label-warning";
					break;
				default:
					labelContext = "label-default";
					break;
			}
			return '<span class="label ' + labelContext + '">' + ucfirst(status) + '</span>';
		}
	</script>
@stop
