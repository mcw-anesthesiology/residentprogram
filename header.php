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
        if($_SESSION["type"] == "admin"){
      ?>
        <li><a href="request.php">Request Evaluation</a></li>
        <li><a href="dashboard.php">View Evaluation</a></li>
        <li><a href="#">Manage Evaluations</a></li>
        <li><a href="#">Manage Accounts</a></li>
        <li><a href="#">Generate Reports</a></li>
        <li><a href="logout.php">Logout</a></li>
      <?php 
        } else if($_SESSION["type"] == "faculty"){
      ?>
        <li><a href="request.php">Complete Evaluation</a></li>
        <li><a href="dashboard.php">View Evaluation</a></li>
        <li><a href="logout.php">Logout</a></li>
      <?php 
        } else if($_SESSION["type"] == "resident"){
      ?>
        <li><a href="request.php">Request Evaluation</a></li>
        <li><a href="dashboard.php">View Evaluation</a></li>
        <li><a href="logout.php">Logout</a></li>
      <?php
        }
      ?>

      <li><a href="dashboard.php">Welcome, <?php echo ucfirst($_SESSION["fname"])." ".ucfirst($_SESSION["lname"]); ?>
      <?php 
        if($_SESSION["type"] == "faculty"){
			$mysqli = new mysqli("localhost", "mcw", "BobbyLite", "mcw");
		if($mysqli->connect_errno){
			echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
		}
		
		$requests = $mysqli->query("select * from requests where requestedTo='{$_SESSION["username"]}' and status='active' and completeDate is null;");
		$num = $requests->num_rows;
      ?>
        <span class="badge"><?= $num ?></span>
      <?php 
        }
      ?>
        </a></li>
      </ul>
    </div>
  </div>
</div>
