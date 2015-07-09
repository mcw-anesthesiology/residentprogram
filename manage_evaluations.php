<?php
	//This page is used to enable/disable evaluations. It contains a single table that displays every single evaluation in the system.
	//Each row represents an evaluation, and contains information about that request/evaluation as well as a button to enable/disable it.

	//TODO: Remove the New Evaluation Form button

  session_start();
  require "init.php";

 	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}

  $forms = $mysqli->query("select `formId`, `title` from `forms`;");
  $formsRow = $forms->fetch_assoc();

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
    <style>
		.view { cursor: pointer }
    </style>
  </head>

  <body>

<?php require 'header.php'; ?>

    <div class="container-fluid">
        <h2 class="sub-header">Manage Evaluations <button class="addEval btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-bulk-disable-modal" data-id="eval" id="bulkDisableBtn"><span class="glyphicon glyphicon-remove"></span> Archive Evals</button></h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortDown"><span>#</span></th>
                  <th><span>Requested By</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Complete Date</span></th>
                  <th><span>Status</span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
    </div>

<!-- Disable Modal -->
<div class="modal fade bs-disable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalDisable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalDisable">Disable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
		<form method="post" action="disable_evaluation.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Enable Modal -->
<div class="modal fade bs-enable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalEnable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEnable">Enable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
		<form method="post" action="enable_evaluation.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-success" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Cancel Modal -->
<div class="modal fade bs-cancel-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancel">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" data-dismiss="modal" id="requestId" value="">Confirm</button>
      </div>
    </div>
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
      <form action="form_builder.php" method="post">
        <div class="modal-body modal-add">
		  <!--
          <div class="form-group">
            <label for="evaluationForm">Please select a form to duplicate and modify</label>
            <select class="form-control">
				<?php
			//	while(!is_null($formsRow)){
			//	echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
			//	$formsRow = $forms->fetch_assoc();
			//	}
				?>
            </select>
            <br />
              <div class="span7 text-center">
				<button type="submit" class="btn btn-success">Choose</button>
			  </div>
          </div>

          <div class="select-or">
            <hr class="hr-or">
            <span class="span-or">or</span>
          </div>
		  -->
          <div class="form-group">
			<div class="span7 text-center">
				<button type="submit" class="btn btn-success">Create new evaluation form</button>
			</div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </form>
    </div>
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
			<input type="date" class="form-control" id="bulkDisableDate" name="bulkDisableDate">
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

<?php
	include "scripts.html";
?>
    <script>
		$(document).on("click", ".disableEval", function(){
			var requestId = $(this).data('id');
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
			$.ajax({
                type: "post",
                url: "disable_evaluation.php",
                data: "requestId=" + requestId,
                success: function(response){
                    if (response != "false"){
                        span.html("<button class='enableEval btn btn-success btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
                        status.html(response);
                    }
                }
            });
		});

		$(document).on("click", ".enableEval", function(){
            var requestId = $(this).data('id');
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
            var cancel = $(this).parents("tr").find(".cancel");
            $.ajax({
                type: "post",
                url: "enable_evaluation.php",
                data: "requestId=" + requestId,
                success: function(response){
                    if (response != "false") {
                        span.html("<button class='disableEval btn btn-danger btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
                        if (response == "pending") {
                            status.html("<span class='badge badge-pending'>pending</span>");
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
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
			$(".modal-cancel #requestId").val(requestId).data("span", span).data("status", status);
		});

        $(".modal-cancel").on("click", "#requestId", function(){
            var requestId = $(this).val();
            var span = $(this).data("span");
            var status = $(this).data("status");
            $.ajax({
                type: "post",
                url: "cancel_evaluation_admin.php",
                data: "requestId=" + requestId,
                success: function(response){
                    if (response == "true") {
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
				"ajax": "manage_evaluations_json.php",
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
  </body>
</html>
