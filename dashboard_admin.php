<?php
	//This page is the main dashboard for all admin users. It is included by dashboard.php and includes 3 simple metric tables at the top, and then a table of every request present in the database

	  //the following three queries are used to populate the metric data on the top of the admin dashboard
	  $stats_One = $mysqli->query("select status, count(status) as total from requests where status in ('complete','pending','disabled') group by status;");
	  $stats_Two = $mysqli->query("select u.firstName, u.lastName, count(r.status) as pending from users u, requests r where u.username = r.faculty and r.status = 'pending' and u.status='active' and u.type='faculty' group by u.username order by pending desc limit 5;");
	  $stats_Three = $mysqli->query("select u.firstName, u.lastName, count(r.status) as pending from users u, requests r where u.username = r.resident and r.status = 'pending' and u.status='active' and u.type='resident' group by u.username order by pending desc limit 5;");
?>
    <div class="container-fluid">
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
            <h4 class="sub-header">Most Pending (Faculty)</h4>
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
            <h4 class="sub-header">Most Pending (Resident)</h4>
            <table class="table table-striped">
              <tbody>

  <?php
  $threeRow = $stats_Three->fetch_assoc();
  while(!is_null($threeRow)){
  ?>
                <tr>
                  <td><?php echo $threeRow["firstName"]." ".$threeRow["lastName"]; ?></td>
                  <td><?= $threeRow["pending"] ?></td>
                </tr>
  <?php
  $threeRow = $stats_Three->fetch_assoc();
  }
  // ends 3 metrics tables
  ?>

              </tbody>
            </table>
          </div>
        </div>
			<!-- Displays every single request regardless of status -->
          <h2 class="sub-header">All Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable-admin" id="keywordsAll" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident/Fellow</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Complete Date</span></th>
                  <th><span>Status</span></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
    </div>
