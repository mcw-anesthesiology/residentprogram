<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="dashboard.php">Resident Evaluation System</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
      <?php 
        if($_SESSION["type"] == "faculty"){
      ?>
        <li><a href="request.php">Create Evaluation</a></li>
        <li><a href="dashboard.php">View Evaluation</a></li>
      <?php 
        } else if($_SESSION["type"] == "resident"){
      ?>
        <li><a href="request.php">Request Evaluation</a></li>
        <li><a href="dashboard.php">View Evaluation</a></li>
      <?php
        }
      ?>
      
      <?php 
        if($_SESSION["type"] == "admin"){
			//TODO: Make a bit thinner so it doesn't span across two lines before collapsing 
      ?>
      <li><a href="request.php">Request Evaluation</a></li>
      <li class="dropdown">
        <a href="#" data-toggle="dropdown">Manage<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <li><a href="manage_evaluations.php">Evaluations</a></li>
          <li><a href="manage_accounts.php">Accounts</a></li>
          <li><a href="manage_forms.php">Forms</a></li>
          <li><a href="manage_milestones_competencies.php">Milestones/Competencies</a></li>
          <li><a href="manage_mentors.php">Mentors</a></li>
        </ul>
      </li>
	<?php
		}
	?>
      <li class="dropdown">
        <a href="#" data-toggle="dropdown">Reports<b class="caret"></b></a>
        <ul class="dropdown-menu">
		<?php
			if($_SESSION["type"] == "admin"){
		?>
          <li><a class="viewAggRpt" data-toggle="modal" data-target=".bs-aggRpt-modal" id="viewAggRpt">Generate Aggregate</a></li>
        <?php
			}
        ?>
          <li><a class="viewSpecRpt" data-toggle="modal" data-target=".bs-specRpt-modal" id="viewSpecRpt">Generate Specific</a></li>
        </ul>
      </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome, <?php echo ucfirst($_SESSION["fname"])." ".ucfirst($_SESSION["lname"]); ?> 
        <?php 
			if($_SESSION["type"] == "faculty"){
			  require "init.php";
			  $requests = $mysqli->query("select * from requests where faculty='{$_SESSION["username"]}' and status='pending';");
			  $num = $requests->num_rows;
			  if($num > 0){
				?>
					<span class="badge"><?= $num ?></span>
			    <?php 
			  }
			}
        ?>
          <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="logout.php">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- Aggregate Report Modal -->
<div class="modal fade bs-aggRpt-modal" tabindex="-1" role="dialog" aria-labelledby="modalAggRpt" aria-hidden="true" id="aggRptModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAggRpt">Generate Aggregate Report</h4>
      </div>
      <form method="post" action="view_aggregate_report.php">
        <div class="modal-body modal-aggRpt">
          <div class="form-group">
            <label for="startDate">Start Date:</label>
            <input type="date" class="form-control" id="startDate" name="startDate">
          </div>
          <div class="form-group">
            <label for="endDate">End Date:</label>
            <input type="date" class="form-control" id="endDate" name="endDate">
          </div>
          <div class="form-group">
            <label for="trainingLevelInput">Training Level</label>
            <select class="form-control" id="trainingLevelInput" name="trainingLevel">
              <option value="intern">Intern</option>
              <option value="ca-1">CA-1</option>
              <option value="ca-2">CA-2</option>
              <option value="ca-3">CA-3</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Generate</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Specific Report Modal -->
<div class="modal fade bs-specRpt-modal" tabindex="-1" role="dialog" aria-labelledby="modalSpecRpt" aria-hidden="true" id="specRptModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalSpecRpt">Generate Specific Report</h4>
      </div>
      <form method="post" action="view_specific_report.php">
        <div class="modal-body modal-specRpt">
          <div class="form-group">
            <label for="startDate">Start Date:</label>
            <input type="date" class="form-control" id="startDate" name="startDate">
          </div>
          <div class="form-group">
            <label for="endDate">End Date:</label>
            <input type="date" class="form-control" id="endDate" name="endDate">
          </div>
          <div class="form-group">
            <label for="trainingLevelInput">Training Level</label>
            <select class="form-control" id="trainingLevelInput" name="trainingLevel">
              <option value="intern">Intern</option>
              <option value="ca-1">CA-1</option>
              <option value="ca-2">CA-2</option>
              <option value="ca-3">CA-3</option>
            </select>
          </div>
          <?php 
			if($_SESSION["type"] == "admin" || $_SESSION["type"] == "faculty"){
				if($_SESSION["type"] == "admin"){
					$query = "select username, firstName, lastName from users where type='resident';";
				}
				else if($_SESSION["type"] == "faculty"){
					$query = "select username, firstName, lastName from mentorships, users where resident=username and faculty='{$_SESSION["username"]}' and mentorships.status='active'";
				}
				$residents = $mysqli->query($query);
				$residentRow = $residents->fetch_assoc();
			  ?>
			  <div class="form-group">
				<label for="resident">Resident</label>
				<select class="form-control" name="resident">
			  <?php
				  while(!is_null($residentRow)){
					echo "<option value=\"{$residentRow["username"]}\">{$residentRow["firstName"]} {$residentRow["lastName"]}</option>";
					$residentRow = $residents->fetch_assoc();
				  }
			}
			else if($_SESSION["type"] == "resident"){
				//TODO: need error checking for this yet
				?>
					<div class="form-group">
						<label for="resident">Resident</label>
						<select class="form-control" name="resident">
							<option value="<?= $_SESSION["username"] ?>">
								<?= $_SESSION["fname"]." ".$_SESSION["lname"] ?>
							</option>
						</select>
				<?php
			}
          ?>
          
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Generate</button>
        </div>
      </form>
    </div>
  </div>
</div>
