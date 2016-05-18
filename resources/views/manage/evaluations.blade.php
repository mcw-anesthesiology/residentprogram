@extends("app")

@section("head")
	<style>
		.visibility {
			margin-top: 5px;
		}

		.visibility-edit {
			margin: 5px;
		}
	</style>
@stop

@section("body")
	<h2 class="sub-header">Manage Evaluations <button class="archiveEval btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-archive-modal" id="archiveBtn"><span class="glyphicon glyphicon-remove"></span> Archive Evals</button></h2>
	  <div class="table-responsive">
		<table class="table table-striped datatable" id="manage-evals-table" cellspacing="0" cellpadding="0" width="100%">
		  <thead>
			<tr>
			  <th class="headerSortDown"><span>#</span></th>
			  <th>Subject</th>
			  <th>Evaluator</th>
			  <th>Requested By</th>
			  <th>Form</th>
			  <th>Evaluation Date</th>
			  <th>Request Date</th>
			  <th>Complete Date</th>
			  <th>Status</th>
			  <th>Action</th>
			</tr>
		  </thead>
		  <tbody>
		  </tbody>
		</table>
	  </div>
	</div>

	<!-- Bulk Disable Modal -->
	<div class="modal fade bs-archive-modal" tabindex="-1" role="dialog" aria-labelledby="modalArchive" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title" id="myModalArchive">Archive Evaluations</h4>
	      </div>
	      <form method="post" action="#">
			  {!! csrf_field() !!}
			  <div class="modal-body">
				<label for="endDate">Archive evaluations older than</label>
				<input type="text" class="form-control datepicker" id="archive-date" name="archive_date">
			  </div>
			  <div class="form-group" style="text-align: center;">
				<button type="button" id="lastThreeMonthsDisable" class="btn lastThreeMonthsDisable">Three Months</button>
				<button type="button" id="lastSixMonthsDisable" class="btn lastSixMonthsDisable">Six Months</button>
			  </div>
			  <div class="modal-footer modal-bulk-archive">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-danger">Disable evaluations</button>
			  </div>
	      </form>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		$(document).on("click", ".disableEval", function(){
			var requestId = $(this).data('id');
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "disable";
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
			$.ajax({
                type: "post",
                url: "/manage/evaluations/"+requestId,
                data: data,
                success: function(response){
                    if (response != "false"){
                        span.fadeOut(function(){
							$(this).html("<button class='enableEval btn btn-success btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
							$(this).fadeIn();
						});
                        status.fadeOut(function(){
							$(this).html("<span class='badge badge-disabled'>disabled</span>");
							$(this).fadeIn();
						});

                    }
                }
            });
		});

		$(document).on("click", ".enableEval", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "enable";
            var requestId = $(this).data('id');
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
            var cancel = $(this).parents("tr").find(".cancel");
            $.ajax({
                type: "post",
                url: "/manage/evaluations/"+requestId,
                data: data,
                success: function(response){
                    if (response != "false") {
                        span.fadeOut(function(){
							$(this).html("<button class='disableEval btn btn-danger btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
							$(this).fadeIn();
						});
                        if (response == "pending") {
                            status.fadeOut(function(){
								$(this).html("<span class='badge badge-pending'>"+response+"</span>");
								$(this).fadeIn();
							});

                        	cancel.fadeOut(function(){
								$(this).html("<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Cancel</button>");
								$(this).fadeIn();
							});
                        }
                        else if (response == "complete") {
                            status.fadeOut(function(){
								$(this).html("<span class='badge badge-complete'>complete</span>");
								$(this).fadeIn();
							});
                        }
                    }
                }
            });
		});

		$(document).on("click", ".cancelEval", function(){
			var requestId = $(this).data('id');
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "cancel";
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
            $.ajax({
                type: "post",
                url: "/manage/evaluations/"+requestId,
                data: data,
                success: function(response){
                    if (response != "false") {
						span.fadeOut(function(){
							$(this).html("");
						});
                        status.fadeOut(function(){
							$(this).html("<span class='badge badge-disabled'>canceled by admin</span>");
							$(this).fadeIn();
						});
                    }
                }
            });
        });

		function lastThreeMonthsDisable(){
			var d = new Date();
			var day = d.getDate();
			d.setMonth(d.getMonth()-3);
			day = ("0"+day).slice(-2); //converts possible D dates to DD format
			var month = d.getMonth()+1;
			month = ("0"+month).slice(-2); //converts possible M months to MM format
			var year = d.getFullYear();
			var date = year+"-"+month+"-"+day;
			$(document).find("#bulkDisableDate").val(date);
		}

		function lastSixMonthsDisable(){
			var d = new Date();
			d.setMonth(d.getMonth()-6);
			var day = d.getDate();
			day = ("0"+day).slice(-2); //converts possible D dates to DD format
			var month = d.getMonth()+1;
			month = ("0"+month).slice(-2); //converts possible M months to MM format
			var year = d.getFullYear();
			var date = year+"-"+month+"-"+day;
			$(document).find("#bulkDisableDate").val(date);
		}

		$("body").popover({
			html: true,
			selector: ".visibility",
			trigger: "focus",
			placement: "auto top",
			title: "Subject visibility",
			content: function(){
				var evalId = $(this).data("id");
				return "<button type='button' class='visibility-edit btn btn-info' data-eval='" + evalId + "' data-visibility='visible'>Visible <span class='glyphicon glyphicon-eye-open'></span></button> " +
				"<button type='button' class='visibility-edit btn' data-eval='" + evalId + "' data-visibility='anonymous'>Anonymous <span class='glyphicon glyphicon-eye-close'></span></button> " +
				"<button type='button' class='visibility-edit btn btn-default' data-eval='" + evalId + "' data-visibility='hidden'>Hidden <span class='glyphicon glyphicon-eye-close'></span></button> " +
				"<button type='button' class='visibility-edit btn btn-primary' data-eval='" + evalId + "' data-visibility='reset'>Reset <span class='glyphicon glyphicon-repeat'></span></button> ";
			}
		});

		$("body").on("click", ".visibility-edit", function(){
			var evalId = $(this).data("eval");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "visibility";
			data.visibility = $(this).data("visibility");
			$.post("/manage/evaluations/" + evalId, data, function(response){
				if(response != "false"){
					var button = $(".visibility[data-id='" + evalId + "']");
					button.fadeOut(function(){
						switch(response){
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
						button.fadeIn();
					});
				}
			});
		});

		$(document).ready(function(){
		  $("#manage-evals-table").DataTable({
			"ajax": "/manage/evaluations/get/20",
			"order": [[0, "desc"]],
			"initComplete": unlimitTableEvals
		  });

		  $("#lastSixMonthsDisable").click(lastSixMonthsDisable);
		  $("#lastThreeMonthsDisable").click(lastThreeMonthsDisable);
		});
    </script>
@stop