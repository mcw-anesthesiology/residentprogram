@extends("app")

@section("body")
	<h2 class="sub-header">Manage Evaluations <button class="addEval btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-bulk-disable-modal" data-id="eval" id="bulkDisableBtn"><span class="glyphicon glyphicon-remove"></span> Archive Evals</button></h2>
	  <div class="table-responsive">
		<table class="table table-striped datatable" cellspacing="0" cellpadding="0">
		  <thead>
			<tr>
			  <th class="headerSortDown"><span>#</span></th>
			  <th>Resident</th>
			  <th>Faculty</th>
			  <th>Requested By</th>
			  <th>Form</th>
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
	<div class="modal fade bs-bulk-disable-modal" tabindex="-1" role="dialog" aria-labelledby="modalBulkDisable" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title" id="myModalBulkDisable">Archive Evaluations</h4>
	      </div>
	      <form method="post" action="bulk_disable_evaluation.php">
			  <div class="modal-body">
				<label for="endDate">Archive evaluations older than</label>
				<input type="text" class="form-control datepicker" id="bulkDisableDate" name="bulkDisableDate">
			  </div>
			  <div class="form-group" style="text-align: center;">
				<button type="button" id="lastThreeMonthsDisable" class="btn lastThreeMonthsDisable">Three Months</button>
				<button type="button" id="lastSixMonthsDisable" class="btn lastSixMonthsDisable">Six Months</button>
			  </div>
			  <div class="modal-footer modal-bulk-disable">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-danger">Confirm</button>
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
                        span.html("<button class='enableEval btn btn-success btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
                        status.html("<span class='badge badge-disabled'>disabled</span>");
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
                        span.html("<button class='disableEval btn btn-danger btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
                        if (response == "pending") {
                            status.html("<span class='badge badge-pending'>"+response+"</span>");
                            cancel.html("<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Cancel</button>");
                        }
                        else if (response == "complete") {
                            status.html("<span class='badge badge-complete'>complete</span>");
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
						span.html("");
                        status.html("<span class='badge badge-disabled'>canceled by admin</span>");
                    }
                }
            });
        });

		$("tbody").on("click", ".view", function(){
			var requestId = $(this).parent().data("id");
			window.location.href = "view_specific.php?request="+requestId;
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

		$(document).ready(function(){
		  $(".datatable").each(function(){
			  $(this).DataTable({
				"ajax": "/manage/evaluations/get",
					deferRendering: true,
					stateSave: true,
					"order": [[0, "desc"]],
					"dom": "lfprtip"
			  });
		  });

		  $("#lastSixMonthsDisable").click(lastSixMonthsDisable);
		  $("#lastThreeMonthsDisable").click(lastThreeMonthsDisable);
		});
    </script>
@stop
