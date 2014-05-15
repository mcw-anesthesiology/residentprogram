<?php
	//This page is the main dashboard for all admin users. It is included by dashboard.php and includes 3 simple metric tables at the top, and then a table of every request present in the database
	
	  $requests = $mysqli->query("select requestId, resident, faculty, requestDate, completeDate, requests.status, title, residentUsers.firstName as residentFirst, residentUsers.lastName as residentLast, facultyUsers.firstName as facultyFirst, facultyUsers.lastName as facultyLast from requests left join forms on requests.formId=forms.formId left join users residentUsers on resident=residentUsers.username left join users facultyUsers on faculty=facultyUsers.username order by requestId desc;");
	  $requestRow = $requests->fetch_assoc();
	  
	  //the following three queries are used to populate the metric data on the top of the admin dashboard
	  $stats_One = $mysqli->query("select status, count(status) as total from requests where status in ('complete','pending','disabled') group by status;");
	  $stats_Two = $mysqli->query("select u.firstName, u.lastName, count(r.status) as pending from users u, requests r where u.username = r.faculty and r.status = 'pending' group by u.username order by pending desc limit 3;");
	  $stats_Three = $mysqli->query("select u.firstName, u.lastName, r.completeDate from users u, requests r where u.username = r.resident and r.status not in ('pending','disabled') group by u.userName order by r.completeDate limit 3;");	 
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
            <h4 class="sub-header">Top 3: Most Pending Evaluations</h4>
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
            <h4 class="sub-header">Top 3: Need Evaluation</h4>
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
  // ends 3 metrics tables
  ?>

              </tbody>
            </table>
          </div>
        </div>
			<!-- Displays every single request regardless of status -->
          <h2 class="sub-header">All Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" id="keywordsAll" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Complete Date</span></th>
                  <th><span>Status</span></th>
                </tr>
              </thead>
              <tbody>
					<?php
						while(!is_null($requestRow)){
					?>
							<tr class="view" data-id="<?= $requestRow["requestId"] ?>">
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["residentFirst"] ?> <?= $requestRow["residentLast"] ?></td>
							  <td><?= $requestRow["facultyFirst"] ?> <?= $requestRow["facultyLast"] ?></td>
							  <td><?= $requestRow["title"] ?></td>
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
