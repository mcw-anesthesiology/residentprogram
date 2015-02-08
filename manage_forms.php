<?php
	//This page is used to create/enable/disable evaluation forms. It contains a button to create a new form, and a single table that represents all forms present in the system.

  session_start();
  require "init.php";
  if($_SESSION["type"] !== "admin"){
    header("Location: dashboard.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
  </head>
  <body>

<?php require 'header.php'; ?>

<?php
  if($_SESSION["type"] == "admin"){       // ************************************ RESIDENT ***********************************************************************
    $forms = $mysqli->query("select * from forms;");
    $form = $forms->fetch_assoc();
?>
  <div class="container-fluid">
    <div class="row">
      <h2 class="sub-header">Forms  <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
      <div class="table-responsive">
        <table class="table table-striped user-table datatable" id="keywordsAll">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
<?php
    while(!is_null($form)){
?>
            <tr>
              <td><?= $form["title"] ?></td>
              <td><?= $form["createdDate"] ?></td>
              <td><form action="view_form.php" target="_blank" method="post">
                  <span>
<?php
  if($form["status"] == "inactive"){
?>
              <button type="button" class="enableEval btn btn-success btn-xs" data-id="<?= $form["formId"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button>
<?php
  }
  else{
?>
              <button type="button" class="disableEval btn btn-danger btn-xs" data-id="<?= $form["formId"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button>
<?php
  }
?>
			     </span>
              <button type="submit" class="printEval btn btn-xs" name="formLocation" value="<?= $form["location"] ?>">View Form</button>
			  </form></td>
            </tr>
<?php
      $form = $forms->fetch_assoc();
    }
  }
?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Disable Modal -->
<div class="modal fade bs-disable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalDisable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalDisable">Disable Form</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> the selected form. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
    <form method="post" action="disable_form.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="formId" name="formId" value="">Confirm</button>
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
          <h4 class="modal-title" id="myModalEnable">Enable Form</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected form. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
    <form method="post" action="enable_form.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-success" id="formId" name="formId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Edit Modal -->
<div class="modal fade bs-edit-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEnable">Enable Form</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected form. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
    <form method="post" action="enable_form.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-success" id="formId" name="formId" value="">Confirm</button>
        </form>
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
      //  while(!is_null($formsRow)){
      //  echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
      //  $formsRow = $forms->fetch_assoc();
      //  }
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

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="../../assets/js/docs.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.1/js/jquery.dataTables.js"></script>
<script>
    $(document).on("click", ".disableEval", function(){
        var formId = $(this).data('id');
        var span = $(this).parent();
        $.ajax({
            type: "post",
            url: "disable_form.php",
            data: "formId=" + formId,
            success: function(response){
                if (response == "true")
                    span.html("<button type='button' class='enableEval btn btn-success btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
            }
        });
    });

    $(document).on("click", ".enableEval", function(){
        var formId = $(this).data('id');
        var span = $(this).parent();
        $.ajax({
            type: "post",
            url: "enable_form.php",
            data: "formId=" + formId,
            success: function(response){
                if (response == "true")
                    span.html("<button type='button' class='disableEval btn btn-danger btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
            }
        });
    });

    $(document).ready(function(){
        $(".datatable").each(function(){
            $(this).dataTable();
        });
    });
</script>
</body>
</html>
