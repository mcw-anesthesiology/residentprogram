<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="favicon.ico">

		<title>Resident Program Evaluation System</title>

		<!-- Bootstrap core CSS -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
		<link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="main.css" rel="stylesheet">
		<!-- <link href="https://cdn.datatables.net/1.10.1/css/jquery.dataTables.css" rel="stylesheet"> -->
		<link href="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		@yield("head")
	</head>
	<body>
		<div class="container-fluid">
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

			        @if($userType == "faculty")
			            <li><a href="request.php">Create Evaluation</a></li>
			            <li><a href="dashboard.php">View Evaluation</a></li>
			        @elseif($userType == "resident")
			            <li><a href="request.php">Request Evaluation</a></li>
			            <li><a href="dashboard.php">View Evaluation</a></li>
			        @endif

			      @if($userType == "admin")
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
			      @endif
			      <li class="dropdown">
			        <a href="#" data-toggle="dropdown">Reports<b class="caret"></b></a>
			        <ul class="dropdown-menu">
					@if($userType == "admin")
			          <li><a class="viewAggRpt pointer" data-toggle="modal" data-target=".bs-aggRpt-modal" id="viewAggRpt">Generate Aggregate</a></li>
			        @endif
			          <li><a class="viewSpecRpt pointer" data-toggle="modal" data-target=".bs-specRpt-modal" id="viewSpecRpt">Generate Specific</a></li>
					@if($userType == "admin")
					  <li><a href="view_needs_evaluations_report.php">Needs Evaluations</a></li>
					  <li><a href="faculty_stats.php">Faculty Statistics</a></li>
					  <li><a href="resident_stats.php">Resident Statistics</a></li>
			          <li><a href="fellow_stats.php">Fellow Statistics</a></li>
					  <li><a href="milestones_competencies_forms_report.php">Milestones/Competencies - Forms</a></li>
			        @endif
			        </ul>
			      </li>

			        <li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			              Welcome, {{ ucfirst($firstName) }} {{ucfirst($lastName)}}
			    		@if($userType == "faculty")
			    			 @if($numPendingRequests > 0)
			    				<span class="badge">{{ $numPendingRequests }}</span>
			                 @endif
			            @endif
			              <b class="caret"></b>
			          </a>
			          <ul class="dropdown-menu">
			            <li><a href="manage_user.php">Manage Account</a></li>
			            <li><a href="logout.php">Logout</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
			  </div>
			</div>

			@yield("body")

			<div class="footer">
				<a href="contact.php">Contact</a>
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
		      <form class="report" method="post" action="view_aggregate_report.php">
		        <div class="modal-body modal-aggRpt report-options">
		          <div class="form-group">
		            <label for="startDate">Start Date:</label>
		            <input type="text" class="form-control datepicker startDate" id="startDate" name="startDate">
		          </div>
		          <div class="form-group">
		            <label for="endDate">End Date:</label>
		            <input type="text" class="form-control datepicker endDate" id="endDate" name="endDate">
		          </div>
		          <div class="form-group" style="text-align: center;">
					<button type="button" id="lastThreeMonths" class="btn lastThreeMonths">Last Three Months</button>
					<button type="button" id="lastSixMonths" class="btn lastSixMonths">Last Six Months</button>
		          </div>
		          <div class="form-group">
		            <label for="trainingLevelInput">Training Level</label>
		            <select class="form-control" id="trainingLevelInput" name="trainingLevel">
		              <option value="intern">Intern</option>
		              <option value="ca-1">CA-1</option>
		              <option value="ca-2">CA-2</option>
		              <option value="ca-3">CA-3</option>
		              <option value="fellow">Fellow</option>
		              <option value="all">All</option>
		            </select>
		          </div>
		          <div class="form-group" style="text-align: center;">
					<input type="checkbox" id="graphs" name="graphs" value="yes" checked /><label for="graphs">Generate Graphs</label>
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
		      <form class="report" method="post" action="view_specific_report.php">
		        <div class="modal-body">
		          <div class="modal-specRpt">
		              <div class="form-group">
		                <label for="resident">Resident</label>
		                <select class="form-control" name="resident">
		                    <option value="-1">-- Select Resident --</option>
		                    @foreach($residents as $resident){
		                        <option value="{{ $resident["username"] }}">{{ $resident["lastName"] }}, {{ $resident["firstName"] }}</option>
		                    @endforeach
		                </select>
		               </div>
		            @if($userType == "resident")
		                <div class="form-group">
		                    <label for="resident">Resident</label>
		                    <select class="form-control" name="resident">
		                        <option value="<?= $_SESSION["username"] ?>">
		                            <?= $_SESSION["fname"]." ".$_SESSION["lname"] ?>
		                        </option>
		                    </select>
		                </div>
		            @endif
		          </div>
		          <div class="form-group" style="text-align: center;">
		              <button type="button" class="btn" id="addNewSpecificReport">Add Report</button>
		          </div>
		          <div class="form-group" style="text-align: center;">
					<input type="checkbox" id="graphs" name="graphs" value="yes" checked /><label for="graphs">Generate Graphs</label>
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
		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.0.4/js/dataTables.fixedColumns.min.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>
		<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
		<script>
		    var numSpecificReports = 0;
			function reportHtml(i) {
		        return '<div class="report-options">'+
		        '<button type="button" class="close remove-report-group" aria-hidden="true">&times;</button>'+
		        '<h3>Report</h3>'+
		     '<div class="form-group">'+
		       '<label for="startDate">Start Date:</label>'+
		       '<input type="text" class="form-control datepicker startDate" id="startDate'+i+'" name="startDate'+i+'">'+
		     '</div>'+
		     '<div class="form-group">'+
		       '<label for="endDate">End Date:</label>'+
		       '<input type="text" class="form-control datepicker endDate" id="endDate'+i+'" name="endDate'+i+'">'+
		     '</div>'+
		     '<div class="form-group" style="text-align: center;">'+
		       '<button type="button" id="lastThreeMonths" class="btn lastThreeMonths">Last Three Months</button>'+
		       '<button type="button" id="lastSixMonths" class="btn lastSixMonths">Last Six Months</button>'+
		     '</div>'+
		     '<div class="form-group">'+
		       '<label for="trainingLevelInput">Training Level</label>'+
		       '<select class="form-control" id="trainingLevelInput" name="trainingLevel'+i+'">'+
		         '<option value="intern">Intern</option>'+
		         '<option value="ca-1">CA-1</option>'+
		         '<option value="ca-2">CA-2</option>'+
		         '<option value="ca-3">CA-3</option>'+
		         '<option value="fellow">Fellow</option>'+
		         '<option value="all">All</option>'+
		       '</select>'+
		     '</div>'+
		     '<hr /><br />'+
		     '</div>';
		    }

		     $(".modal-specRpt").append(reportHtml(0));
		     $("#addNewSpecificReport").click(function(){
				 $(".modal-specRpt").append(reportHtml(++numSpecificReports));
				 $(".datepicker").datepicker({
					 dateFormat: "yy-mm-dd"
				 });
		     });

		     $(".modal-specRpt").on("click", ".remove-report-group", function(){
		        $(this).parent().remove();
		     });

		    function checkReportQuery(){
			//Checks the report queries to make sure the entered date is of the correct format because not all browsers support the html5 datepicker being used.
				dateError = false;
				$(this).find("input").each(function(){
					if($(this).attr("type") == "date"){
						var date = $(this).val();
						var regex = /^\d\d\d\d-\d\d-\d\d$/;
						if(!new RegExp(regex).test(date)){
							dateError = true;
						}
					}
				});

				if(dateError){
					alert("Please enter a valid date. If your browser does not support the date selector, date must be formatted YYYY-MM-DD");
				}

				return !dateError;
			}

			function lastSixMonths(){
				var d = new Date();
				var day = d.getDate();
				day = ("0"+day).slice(-2); //converts possible D dates to DD format
				var month = d.g;
				day = ("0"+day).slice(-2);
				month = d.getMont;
				day = ("0"+day).slice(-2);
				month = d.getMonth()+1;
				month = ("0"+month).slice(-2);
				year = d.getFullYear();
				date = year+"-"+month+"-"+day;
				$(this).parents(".report-options").find(".startDate").val(date);
			}

			function lastThreeMonths(){
				var d = new Date();
				var day = d.getDate();
				day = ("0"+day).slice(-2); //converts possible D dates to DD format
				var month = d.getMonth()+1;
				month = ("0"+month).slice(-2); //converts possible M months to MM format
				var year = d.getFullYear();
				var date = year+"-"+month+"-"+day;
				$(this).parents(".report-options").find(".endDate").val(date);

				d.setMonth(d.getMonth()-3);
				day = d.getDate();
				day = ("0"+day).slice(-2);
				month = d.getMonth()+1;
				month = ("0"+month).slice(-2);
				year = d.getFullYear();
				date = year+"-"+month+"-"+day;
				$(this).parents(".report-options").find(".startDate").val(date);
			}

			$(document).ready(function(){
				$(".report").submit(checkReportQuery);
		        $(".report").on("click", ".lastSixMonths", lastSixMonths);
		        $(".report").on("click", ".lastThreeMonths", lastThreeMonths);
				$(".datepicker").datepicker({
					dateFormat: "yy-mm-dd"
				});
			});
		</script>
		@yield("script")
	</body>
</html>
