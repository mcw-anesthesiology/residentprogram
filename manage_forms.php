<?php 
  session_start(); 
  require "init.php";
  if($_SESSION["type"] !== "admin"){
    header("Location: dashboard.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
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
        <table class="table table-striped user-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
<?php
    while(!is_null($form)){
?>
            <tr>
              <td><?= $form["title"] ?></td>
              <td><?= $form["createdDate"] ?></td> 
<?php
  if($form["status"] == "inactive"){
?>
              <td><button class="enableEval btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $form["formId"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
  }
  else{
?>
              <td><button class="disableEval btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $form["formId"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
<?php
  }
?> 
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
          <h4 class="modal-title" id="myModalEnable">Enable Form</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected form. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
    <form method="post" action="enable_form.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-success" id="requestId" name="requestId" value="">Confirm</button>
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
<script>
    $(document).on("click", ".disableEval", function(){
      var formId = $(this).data('id');
      $(".modal-disable #formId").val(formId);
    });
    
    $(document).on("click", ".enableEval", function(){
      var formId = $(this).data('id');
      $(".modal-enable #formId").val(formId);
    }); 
</script>
</body>
</html>
