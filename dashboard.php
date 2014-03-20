<?php 
	session_start();
	require "init.php";

  $stats_One = $mysqli->query("select status, count(status) as total from requests where status in ('complete','pending','disabled') group by status;");
  $stats_Two = $mysqli->query("select u.firstName, u.lastName, count(r.status) as pending from users u, requests r where u.username = r.faculty and r.status = 'pending' group by u.username order by pending desc limit 3;");
  $stats_Three = $mysqli->query("select u.firstName, u.lastName, r.completeDate from users u, requests r where u.username = r.resident and r.status not in ('pending','disabled') group by u.userName order by r.completeDate limit 3;");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

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
  if($_SESSION["type"] == "admin"){				// ************************************ ADMIN ***********************************************************************
	  $requests = $mysqli->query("select * from requests order by requestId desc;");
	  $requestRow = $requests->fetch_assoc();	  
?>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 visible-md visible-lg">
          <div class="col-md-4">
            <h4 class="sub-header">Evaluation Statistics</h4>
            <table class="table table-striped">
              <tbody>
  <?php
  $oneRow = $stats_One->fetch_assoc();
  while(!is_null($oneRow)){
    if($oneRow["status"] == "pending"){
      $msg = "Total Pending:";
    }
    else if($oneRow["status"] == "complete"){
      $msg = "Total Completed:";
    }
    else if($oneRow["status"] == "disabled"){
      $msg = "Total Disabled:";
    }
  ?>
                <tr>
                  <td><?= $msg ?></td>
                  <td><?= $oneRow["total"] ?></td>
                </tr>
  <?php
  $oneRow = $stats_One->fetch_assoc();
  }
  ?>
              </tbody>
            </table>
          </div>

          <div class="col-md-4">
            <h4 class="sub-header">Top 3: Most Pending Evaluations  <small><a href="view_pending_stat.php">view all</a></small></h4>
            <table class="table table-striped">
              <tbody>
  <?php
  $twoRow = $stats_Two->fetch_assoc();
  while(!is_null($twoRow)){
  ?>
                <tr>
                  <td><?php echo $twoRow["firstName"]." ".$twoRow["lastName"]; ?></td>
                  <td><?= $twoRow["pending"] ?></td>
                </tr>
  <?php
  $twoRow = $stats_Two->fetch_assoc();
  }
  ?>
              </tbody>
            </table>
          </div>

          <div class="col-md-4">
            <h4 class="sub-header">Top 3: Need Evaluation  <small><a href="view_recent_stat.php">view all</a></small></h4>
            <table class="table table-striped">
              <tbody>

  <?php
  $threeRow = $stats_Three->fetch_assoc();
  while(!is_null($threeRow)){
  ?>
                <tr>
                  <td><?php echo $threeRow["firstName"]." ".$threeRow["lastName"]; ?></td>
                  <td><?= $threeRow["completeDate"] ?></td>
                </tr>
  <?php
  $threeRow = $stats_Three->fetch_assoc();
  }
  ?>

              </tbody>
            </table>
          </div>
        </div>

          <h2 class="sub-header">All Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsAll" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Complete Date</span></th>
                  <th><span>Status</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
					while(!is_null($requestRow)){
				  ?>
						<tr>
						  <td class="lalign"><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
						  <td><?= $requestRow["resident"] ?></td>
						  <td><?= $requestRow["faculty"] ?></td>
						  <td><?= $requestRow["requestDate"] ?></td>
						  <td><?= $requestRow["completeDate"] ?></td>
<?php
  if($requestRow["status"] == "complete"){
?>
						  <td><span class="badge badge-complete"><?= $requestRow["status"] ?></span></td>
<?php
  }
  else if($requestRow["status"] == "pending"){
?>
              <td><span class="badge badge-pending"><?= $requestRow["status"] ?></span></td>
<?php
  }
  else{
?>
              <td><span class="badge badge-disabled"><?= $requestRow["status"] ?></span></td>
<?php
  }
?>
						</tr>
						
                <?php
						$requestRow = $requests->fetch_assoc();
					}
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
  }
  else if($_SESSION["type"] == "faculty"){  	// ************************************ FACULTY ***********************************************************************
	  $requests = $mysqli->query("select * from requests where faculty='{$_SESSION["username"]}' and status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsPending" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Date</span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td class="lalign"><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							  <?php if($requestRow["requestedBy"] == $_SESSION["username"]){?>
								<td><button class="cancelEvalFaculty btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-cancel-faculty-modal-sm" data-id="<?= $requestRow["requestId"] ?>"><span class="glyphicon glyphicon-remove"></span> Cancel</button></td>
							  <?php } else echo "<td></td>"; ?>
							</tr>
					<?php
						$requestRow = $requests->fetch_assoc();
						}
					?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php
		$requests = $mysqli->query("select * from requests where faculty='{$_SESSION["username"]}' and status='complete' order by completeDate desc;");
		$requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsComplete" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Completion Date</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							  <td><?= $requestRow["completeDate"] ?></td>
							</tr>
					<?php
						$requestRow = $requests->fetch_assoc();
						}
					?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
  }
  else if($_SESSION["type"] == "resident"){			// ************************************ RESIDENT ***********************************************************************
	  $requests = $mysqli->query("select * from requests where resident='{$_SESSION["username"]}' and status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsPending" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortDown"><span>#</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Date</span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
              <tbody>
				   <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["faculty"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							  <?php if($requestRow["requestedBy"] == $_SESSION["username"]){?>
								<td><button class="cancelEvalResident btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-cancel-resident-modal-sm" data-id="<?= $requestRow["requestId"] ?>"><span class="glyphicon glyphicon-remove"></span> Cancel</button></td>
							  <?php } else echo "<td></td>"; ?>
							</tr>
					<?php
						$requestRow = $requests->fetch_assoc();
						}
					?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php
		$requests = $mysqli->query("select * from requests where resident='{$_SESSION["username"]}' and status='complete' order by completeDate desc;");
		$requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsComplete" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Date</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["faculty"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							</tr>
					<?php
						$requestRow = $requests->fetch_assoc();
						}
					?>				
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
  }
?>

<!-- Canceled Modal Resident-->
<div class="modal fade bs-cancel-resident-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancelResident" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancelResident">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel-resident">
    <form method="post" action="cancel_evaluation_resident.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Canceled Modal Faculty-->
<div class="modal fade bs-cancel-faculty-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancelFaculty" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancelFaculty">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel-faculty">
    <form method="post" action="cancel_evaluation_faculty.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/jquery.tablesorter.min.js"></script>
    <script>
    $(document).on("click", ".cancelEvalResident", function(){
      var requestId = $(this).data('id');
      $(".modal-cancel-resident #requestId").val(requestId);
    });
    
    $(document).on("click", ".cancelEvalFaculty", function(){
      var requestId = $(this).data('id');
      $(".modal-cancel-faculty #requestId").val(requestId);
    }); 

    $(function(){
      $('#keywordsAll').tablesorter(); 
    });

    $(function(){
      $('#keywordsPending').tablesorter(); 
    });

    $(function(){
      $('#keywordsComplete').tablesorter(); 
    });
    </script>
  </body>
</html>
