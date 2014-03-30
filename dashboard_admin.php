<?php
	  $requests = $mysqli->query("select requestId, resident, faculty, requestDate, completeDate, status, title from requests left join forms on requests.formId=forms.formId order by requestId desc;");
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
						<tr>
						  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
						  <td><?= $requestRow["resident"] ?></td>
						  <td><?= $requestRow["faculty"] ?></td>
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
