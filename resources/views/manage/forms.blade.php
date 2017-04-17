@extends("app")

@section("head")
	<style>
		#edit-form-visibility-group label {
			font-weight: normal;
			margin-left: 20px;
		}

		.visibility-edit {
			margin: 5px;
		}
	</style>
@stop

@section("body")
	<div class="row">
		<h2 class="sub-header">Evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped forms-table" data-type="resident" id="resident-forms-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">Fellow-specific evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped forms-table" data-type="fellow" id="fellow-forms-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">Faculty evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped forms-table" data-type="faculty" id="faculty-forms-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>


	<!-- Add Modal -->
	<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true" id="addModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalAdd">Evaluation Builder</h4>
	      </div>
    	  <div class="modal-body modal-add">
	        <div class="form-group">
	    		<div class="text-center">
	        		<a href="/manage/forms/add" class="btn btn-success">Create new evaluation form</a>
				</div>
					<hr />
					<form action="/manage/forms/edit" method="post">
						{!! csrf_field() !!}
						<div class="form-group">
							<label for="edit-form-forms-list">Form to duplicate</label>
							<select class="form-control" id="edit-form-forms-list" name="form_id">
								<option value="-1" disabled selected>Select form to duplicate</option>
							</select>
						</div>
						<div class="text-center">
							<button type="submit" class="btn btn-info">Duplicate and edit an existing form</button>
						</div>
					</form>
	    		</div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        </div>
	    </div>
	  </div>
	</div>

	<!-- Edit modal -->
	<div class="modal fade bs-edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-form-modal-title" aria-hidden="true" id="edit-form-modal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title" id="edit-form-modal-title">Edit form</h3>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="edit-form-title">Title</label>
						<input type="text" class="form-control" id="edit-form-title" />
						<input type="hidden" id="edit-form-id" />
						<input type="hidden" id="edit-form-type" />
					</div>
					<div class="form-group" id="edit-form-visibility-group">
						<fieldset>
							<legend>Subject visibilty</legend>
							<label><input type="radio" name="visibility" value="visible" /> Visible</label><br />
							<label><input type="radio" name="visibility" value="anonymous" /> Anonymous</label><br />
							<label><input type="radio" name="visibility" value="hidden" /> Hidden</label>
						</fieldset>
					</div>
					<div class="form-group">
						<label class="containing-label">
							Evaluation period type
							<select class="form-control" id="edit-form-period-type">
	@foreach(config('constants.EVALUATION_DATE_PERIODS') as $period)
								<option value="{{ $period }}">{{ ucfirst($period) }}</option>
	@endforeach
							</select>
						</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-info" data-dismiss="modal" id="edit-modal-submit">Save form</button>
				</div>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		$.getJSON("/forms").done(function(forms){
			var form, option;

			var typeIndeces = {
				"resident": 0,
				"fellow": 1,
				"faculty": 2
			};

			var optGroups = [
				{
					text: "Resident",
					children: []
				},
				{
					text: "Fellow",
					children: []
				},
				{
					text: "Faculty",
					children: []
				}
			];

			var form;
			for(var i = 0; i < forms.length; i++){
				form = {
					id: forms[i].id,
					text: forms[i].title
				};
				optGroups[typeIndeces[forms[i].type]].children.push(form);
			}

			for(var i = 0; i < optGroups.length; i++){
				optGroups[i].children.sort(function(a, b){
					if(a.text < b.text)
						return -1;
					else if(a.text > b.text)
						return 1;
					else
						return 0;
				});
			}

			$("#edit-form-forms-list").select2({
				data: optGroups
			});
		});


		$(".forms-table").each(function(){
			var type = $(this).data("type");
			$(this).DataTable({
				ajax: {
					url: "/forms",
					data: {
						type: type
					},
					dataSrc: ""
				},
				columns: [
					{data: "title"},
					{data: "evaluator_type", render: function(evaluatorType){
						return ucfirst(evaluatorType);
					}},
					{data: "created_at", render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: "status", render: function(status, type){
						if(type === "display"){
							var labelType;
							switch(status){
								case "active":
								labelType = "label-success";
								break;
								case "inactive":
								labelType = "label-danger";
								break;
							}
							return '<span class="status label ' + labelType + '">' + ucfirst(status) + '</span>';
						}

						return status;
					}},
					{data: null, render: function(form, type){
						if(type === "display"){
							var visibilityType, buttonType, eyeType;
							switch(form.visibility){
								case "visible":
									visibilityType = "visibility-visible";
									buttonType = "btn-info";
									eyeType = "open";
									break;
								case "anonymous":
									visibilityType = "visibility-anonymous";
									buttonType = "";
									eyeType = "close";
									break;
								case "hidden":
									visibilityType = "visibility-hidden";
									buttonType = "btn-default";
									eyeType = "close";
									break;
							}

							return '<button type="button" class="visibility ' + visibilityType
								+ ' btn ' + buttonType + ' btn-xs" data-id="' + form.id + '">'
								+ ucfirst(form.visibility) + '<span class="glyphicon glyphicon-eye-'
								+ eyeType + '"></span></button>';
						}

						return form.visibility;
					}},
					{data: null, orderable: false, searchable: false, render: function(form, type){
						return '<a href="/manage/forms/' + form.id + '">View Form</a>';
					}},
					{data: null, orderable: false, render: function(form, type){
						// TODO
						var buttonClass, buttonType, glyphiconType, buttonText;
						switch(form.status){
							case "inactive":
								buttonClass = "enable-eval";
								buttonType = "btn-success";
								buttonText = "Enable";
								glyphiconType = "glyphicon-ok";
								break;
							case "active":
								buttonClass = "disable-eval";
								buttonType = "btn-danger";
								buttonText = "Disable";
								glyphiconType = "glyphicon-remove";
								break;
						}
						var editButton = '<button type="button" '
							+ 'class="edit-form-button btn btn-info btn-xs" '
							+ 'data-id="' + form.id + '" data-title="' + form.title + '"'
							+ 'data-type="' + form.type + '" data-visibility="' + form.visibility + '"'
							+ 'data-period-type="' + form.evaluation_period_type + '"'
							+ 'data-toggle="modal" data-target="#edit-form-modal">'
							+ '<span class="glyphicon glyphicon-pencil"></span> Edit</button>';

						var enableDisableButton =  '<span><button type="button" class="'
							+ buttonClass + ' btn ' + buttonType + ' btn-xs" data-id="'
							+ form.id + '">' + '<span class="glyphicon ' + glyphiconType
							+ '"></span>' + buttonText + '</button></span>';

						return editButton + " " + enableDisableButton;
					}}
				]
			});
		});

		$("#edit-modal-submit").click(function(){
			var formId = $("#edit-form-id").val();
			var formType = $("#edit-form-type").val();
			var data = {
				_token: "{{ csrf_token() }}",
				_method: "PATCH",
				title: $("#edit-form-title").val(),
				visibility: $("#edit-form-modal input[name='visibility']:checked").val(),
				evaluation_period_type: $("#edit-form-period-type").val()
			};

			$.ajax({
				url: "/forms/" + formId,
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response == "success"){
					$("#"+formType+"-forms-table").DataTable({
						"retrieve": true
					}).ajax.reload();
				}
				else{
					appendAlert("Sorry, the form cannot be edited at this time");
				}
			}).fail(function(response){
				appendAlert("There was a problem editing the form.");
			});
		});

		$(".forms-table").on("click", ".edit-form-button", function(){
			var formId = $(this).data("id");
			var formType = $(this).data("type");
			var formTitle = $(this).data("title");
			var visibility = $(this).data("visibility");
			var periodType = $(this).data("periodType");

			$("#edit-form-id").val(formId);
			$("#edit-form-type").val(formType);
			$("#edit-form-title").val(formTitle);
			$("#edit-form-modal input[value='" + visibility + "']").prop("checked", true);
			$("#edit-form-period-type").val(periodType);
		});

		$(".forms-table").on("click", ".disable-eval, .enable-eval", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";

			if($(this).hasClass("disable-eval"))
				data.status = "inactive";
			else if($(this).hasClass("enable-eval"))
				data.status = "active";
			else
				return;

			var formId = $(this).data('id');
			var span = $(this).parent();
			var status = $(this).parents("tr").find(".status").parent();
			$.ajax({
				url: "/forms/" + formId,
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if (response === "success"){
					var buttonClass, buttonType, glyphiconType, buttonText, labelType;
					switch(data.status){
						case "inactive":
							buttonClass = "enable-eval";
							buttonType = "btn-success";
							buttonText = "Enable";
							glyphiconType = "glyphicon-ok";
							labelType = "label-danger";
							break;
						case "active":
							buttonClass = "disable-eval";
							buttonType = "btn-danger";
							buttonText = "Disable";
							glyphiconType = "glyphicon-remove";
							labelType = "label-success";
							break;
					}

					span.velocity("fadeOut", {display: "inline", complete: function(){
						$(this).html('<span><button type="button" class="'
							+ buttonClass + ' btn ' + buttonType + ' btn-xs" data-id="'
							+ formId + '">' + '<span class="glyphicon ' + glyphiconType
							+ '"></span>' + buttonText + '</button></span>');
						$(this).velocity("fadeIn");
					}});
					status.velocity("fadeOut", {display: "table-cell", complete: function(){
						$(this).html('<span class="status label ' + labelType + '">' + ucfirst(data.status) + '</span>');
						$(this).velocity("fadeIn");
					}});
				}
				else {
					appendAlert("There was a problem altering the form");
				}
			}).fail(function(response){
				appendAlert("There was a problem altering the form");
			});
		});

		$("body").popover({
			html: true,
			selector: ".visibility",
			trigger: "focus",
			placement: "auto top",
			title: "Subject visibility",
			content: function(){
				var formId = $(this).data("id");
				return "<button type='button' class='visibility-edit btn btn-info' data-form='" + formId + "' data-visibility='visible'>Visible <span class='glyphicon glyphicon-eye-open'></span></button> " +
				"<button type='button' class='visibility-edit btn' data-form='" + formId + "' data-visibility='anonymous'>Anonymous <span class='glyphicon glyphicon-eye-close'></span></button> " +
				"<button type='button' class='visibility-edit btn btn-default' data-form='" + formId + "' data-visibility='hidden'>Hidden <span class='glyphicon glyphicon-eye-close'></span></button> ";
			}
		});

		$(".forms-table").on("click", ".visibility-edit", function(){
			var formId = $(this).data("form");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.visibility = $(this).data("visibility");

			$.ajax({
				url: "/forms/" + formId,
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					$(".edit-form-button[data-id='" + formId + "']").data("visibility", data.visibility);
					var button = $(".visibility[data-id='" + formId + "']");
					button.velocity("fadeOut", function(){
						switch(data.visibility){
							case "visible":
								button.removeClass("visibility-anonymous visibility-hidden btn-default");
								button.addClass("visibility-visible btn-info");
								button.html("Visible <span class='glyphicon glyphicon-eye-open'></span>");
								break;
							case "anonymous":
								button.removeClass("visibility-visible visibility-hidden btn-info btn-default");
								button.addClass("visibility-anonymous");
								button.html("Anonymous <span class='glyphicon glyphicon-eye-close'></span>");
								break;
							case "hidden":
								button.removeClass("visibility-anonymous visibility-visible btn-info");
								button.addClass("visibility-hidden btn-default");
								button.html("Hidden <span class='glyphicon glyphicon-eye-close'></span>");
								break;
						}
						button.velocity("fadeIn");
					});
				}
				else
					appendAlert("There was a problem changing form visibility");
			}).fail(function(){
				appendAlert("There was a problem changing form visibility");
			});
		});
	</script>
@stop
