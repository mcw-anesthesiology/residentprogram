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
				<li><a href="manage_forms.php">Mentors</a></li>
			</ul>
        </li>
        
        <li><a href="#">Generate Reports</a></li>
      <?php 
        } else if($_SESSION["type"] == "faculty"){
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
