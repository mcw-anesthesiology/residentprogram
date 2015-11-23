<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Milestone and competency based evaluation system for health care professionals">
		<meta name="author" content="Jacob Mischka">
		<link rel="shortcut icon" href="/favicon.ico">

		<title>Resident Program Evaluation System</title>

		<!-- Bootstrap core CSS -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
		<link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">

		<!-- Select2 -->
		<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
		<link href="/css/select2-bootstrap.min.css" rel="stylesheet" />

		<!-- Custom styles for this template -->
		<link href="/css/main.css" rel="stylesheet">
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
			<div id="main-navbar" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <a class="navbar-brand" href="/dashboard">Resident Evaluation System</a>
			    </div>
			    <div class="navbar-collapse collapse">
			      <ul class="nav navbar-nav navbar-right">
		          @if($user->type == "faculty")
		            <li><a href="/request">Create Evaluation</a></li>
		            <li><a href="/dashboard">View Evaluations</a></li>
					<li><a href="/dashboard/faculty">View Faculty Evaluations</a></li>
		          @elseif($user->type == "resident")
		            <li><a href="/request">Request Evaluation</a></li>
					<li><a href="/request/faculty">Evaluate Faculty</a></li>
		            <li><a href="/dashboard">View Evaluations</a></li>
			      @elseif($user->type == "admin")
			        <li><a href="/request">Request Evaluation</a></li>
					<li><a href="/dashboard/faculty">Faculty Evaluations</a></li>
			        <li class="dropdown">
			          <a href="#" data-toggle="dropdown">Manage<b class="caret"></b></a>
			          <ul class="dropdown-menu">
			            <li><a href="/manage/evaluations">Evaluations</a></li>
			            <li><a href="/manage/accounts">Accounts</a></li>
			            <li><a href="/manage/forms">Forms</a></li>
			            <li><a href="/manage/milestones-competencies">Milestones/Competencies</a></li>
			            <li><a href="/manage/mentors">Mentors</a></li>
			  		    <li><a href="/manage/block-assignments">Block Assignments</a></li>
			          </ul>
			        </li>
			      @endif
				  @if($user->type == "admin" || $user->type == "resident" || ($user->type == "faculty" && $user->mentees()->count() > 0))
			      	<li class="dropdown">
			        	<a href="#" data-toggle="dropdown">Reports<b class="caret"></b></a>
			        	<ul class="dropdown-menu">
						@if($user->type == "admin")
			          	<li><a class="viewAggRpt pointer" data-toggle="modal" data-target=".bs-aggRpt-modal" id="viewAggRpt">Aggregate</a></li>
			        	@endif
			          	<li><a class="viewSpecRpt pointer" data-toggle="modal" data-target=".bs-specRpt-modal" id="viewSpecRpt">Individual</a></li>
						@if($user->type == "admin")
						<li><a class="viewSpecFacultyRpt pointer" data-toggle="modal" data-target=".bs-specFacultyRpt-modal" id="viewSpecFacultyRpt">Faculty</a></li>
					  	<li><a href="/report/needs-eval">Needs Evaluations</a></li>
					  	<li><a href="/report/stats/faculty">Faculty Statistics</a></li>
					  	<li><a href="/report/stats/resident">Resident Statistics</a></li>
			          	<li><a href="/report/stats/fellow">Fellow Statistics</a></li>
					  	<li><a href="/report/milestones-competencies-forms">Milestones/Competencies - Forms</a></li>
			        	@endif
			        	</ul>
			      	</li>
				  @endif
				  	<li><a class="pointer" data-toggle="modal" data-target=".help-modal">Help</a></li>
				    <li><a href="/contact">Contact</a></li>
			        <li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			              Welcome, {{ ucfirst($user->first_name) }} {{ucfirst($user->last_name)}}
			    		@if($user->type == "faculty")
			    			 @if($user->evaluatorEvaluations->where("status", "pending")->count() > 0)
			    				<span class="badge">{{ $user->evaluatorEvaluations->where("status", "pending")->count() }}</span>
			                 @endif
			            @endif
			              <b class="caret"></b>
			          </a>
			          <ul class="dropdown-menu">
			            <li><a href="/user">Manage Account</a></li>
			            <li><a href="/logout">Logout</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
			  </div>
			</div>
			@if(session("success"))
				<div class="container">
					<div class="alert alert-success alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{{ session("success") }}
					</div>
				</div>
			@endif
			@if(session("info"))
				<div class="container">
					<div class="alert alert-info alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{{ session("info") }}
					</div>
				</div>
			@endif
			@if(session("error"))
				<div class="container">
					<div class="alert alert-danger alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<strong>Error: </strong>{{ session("error") }}
					</div>
				</div>
			@endif
			<div class="container body-block">
				@yield("body")
			</div>
		</div>

		<!-- Aggregate Report Modal -->
		<div class="modal fade bs-aggRpt-modal" role="dialog" aria-labelledby="modalAggRpt" aria-hidden="true" id="aggRptModal">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		        <h4 class="modal-title" id="myModalAggRpt">Generate Aggregate Report</h4>
		      </div>
		      <form class="report" method="post" action="/report/aggregate">
				  {!! csrf_field() !!}
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
					<button type="button" class="btn lastThreeMonths">Last Three Months</button>
					<button type="button" class="btn lastSixMonths">Last Six Months</button>
		          </div>
		          <div class="form-group">
		            <label for="trainingLevelInput">Training Level</label>
		            <select class="form-control select2" id="trainingLevelInput" name="trainingLevel" style="width: 100%">
		              <option value="all">All</option>
					  <option value="intern">Intern</option>
		              <option value="ca-1">CA-1</option>
		              <option value="ca-2">CA-2</option>
		              <option value="ca-3">CA-3</option>
		              <option value="fellow">Fellow</option>
		            </select>
		          </div>
		          <div class="form-group" style="text-align: center;">
					<label for="graphs_yes">Average Graphs Only</label>
					<input type="radio" id="graphs_yes" name="graphs" value="average" checked />
					<br />
					<label for="graphs_all">All Graphs</label>
					<input type="radio" id="graphs_all" name="graphs" value="all" />
					<br />
					<label for="graphs_none">No Graphs</label>
					<input type="radio" id="graphs_none" name="graphs" value="none" />
		          </div>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		          <button type="submit" class="btn btn-primary" value="">Generate</button>
		        </div>
		      </form>
		    </div>
		  </div>
		</div>

		<!-- Specific Report Modal -->
		<div class="modal fade bs-specRpt-modal" role="dialog" aria-labelledby="modalSpecRpt" aria-hidden="true" id="specRptModal">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		        <h4 class="modal-title" id="myModalSpecRpt">Generate Specific Report</h4>
		      </div>
		      <form class="report" method="post" action="/report/specific">
				  {!! csrf_field() !!}
		        <div class="modal-body">
		          <div class="modal-specRpt">
		              <div class="form-group">
		            @if($user->type == "faculty")
						<label for="resident">Resident</label>
						<select class="form-control select2" name="resident" style="width: 100%" required>
							@foreach($user->mentees as $resident)
								<option value="{{ $resident->id }}">{{ $resident->last_name }}, {{ $resident->first_name }}</option>
							@endforeach
						</select>
					@elseif($user->type == "resident")
						<input type="hidden" name="resident" value="{{ $user->id }}" />
					@elseif($user->type == "admin")
						<label for="resident">Resident</label>
						<select class="form-control select2" name="resident" style="width: 100%" required>
							@foreach($residents as $resident)
								<option value="{{ $resident->id }}">{{ $resident->last_name }}, {{ $resident->first_name }}</option>
							@endforeach
						</select>
					@endif
					</div>
		          </div>
		          <div class="form-group" style="text-align: center;">
		              <button type="button" class="btn" id="addNewSpecificReport">Add Report</button>
		          </div>
		          <div class="form-group" style="text-align: center;">
					<input type="checkbox" id="graphs" name="graphs" value="all" checked />
					<label for="graphs">Generate Graphs</label>
		          </div>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		          <button type="submit" class="btn btn-primary" value="">Generate</button>
		        </div>
		      </form>
		    </div>
		  </div>
		</div>

		<div class="modal fade help-modal" role="dialog" aria-hidden="true" id="help-modal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Help</h4>
					</div>
					<div class="modal-body">
						@include("help.".$user->type)
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>

		@if($user->type == "admin")
		<!-- Faculty Report Modal -->
		<div class="modal fade bs-specFacultyRpt-modal" role="dialog" aria-labelledby="modalSpecFacultyRpt" aria-hidden="true" id="specFacultyRptModal">
		  <div class="modal-dialog">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalSpecFacultyRpt">Specific Faculty Report</h4>
			  </div>
			  <form class="report" method="post" action="/report/faculty">
				  {!! csrf_field() !!}
				<div class="modal-body modal-specFacultyRpt report-options">
			 	  <div class="form-group">
					<label for="specific-faculty">Faculty</label>
					<select class="form-control select2" id="specific-faculty" name="faculty" style="width: 100%;" required>
						@foreach($specificFaculty as $faculty)
							<option value="{{ $faculty->id }}">{{ $faculty->last_name }}, {{ $faculty->first_name }}</option>
						@endforeach
					</select>
				  </div>
				  <div class="form-group">
					<label for="startDate">Start Date:</label>
					<input type="text" class="form-control datepicker startDate" id="startDate" name="startDate" required>
				  </div>
				  <div class="form-group">
					<label for="endDate">End Date:</label>
					<input type="text" class="form-control datepicker endDate" id="endDate" name="endDate" required>
				  </div>
				  <div class="form-group" style="text-align: center;">
					<button type="button" class="btn lastThreeMonths">Last Three Months</button>
					<button type="button" class="btn lastSixMonths">Last Six Months</button>
				  </div>
				  <div class="form-group">
				  	<label for="form-id">Form</label>
					<select class="form-control select2" id="form-id" name="form_id" style="width: 100%" required>
				@foreach($facultyForms as $facultyForm)
						<option value="{{ $facultyForm->id }}">{{ $facultyForm->title }}</option>
				@endforeach
					</select>
				  </div>
				</div>
				<div class="modal-footer">
				  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				  <button type="submit" class="btn btn-primary" value="">Generate</button>
				</div>
			  </form>
			</div>
		  </div>
		</div>
		@endif
		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.0.4/js/dataTables.fixedColumns.min.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>
		<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/plug-ins/1.10.9/sorting/datetime-moment.js"></script>
		<script type="text/javascript" src="/js/placeholders.jquery.min.js"></script>
		<script>
		    var numSpecificReports = 0;
			function reportHtml(i) {
		        return '<div class="report-options collapse">'+
		        '<button type="button" class="close remove-report-group" aria-hidden="true">&times;</button>'+
		        '<h3>Report</h3>'+
		     '<div class="form-group">'+
		       '<label for="startDate'+i+'">Start Date:</label>'+
		       '<input type="text" class="form-control datepicker startDate" id="startDate'+i+'" name="startDate'+i+'">'+
		     '</div>'+
		     '<div class="form-group">'+
		       '<label for="endDate">End Date:</label>'+
		       '<input type="text" class="form-control datepicker endDate" id="endDate'+i+'" name="endDate'+i+'">'+
		     '</div>'+
		     '<div class="form-group" style="text-align: center;">'+
		       '<button type="button" class="btn lastThreeMonths">Last Three Months</button> '+
		       '<button type="button" class="btn lastSixMonths">Last Six Months</button>'+
		     '</div>'+
		     '<div class="form-group">'+
		       '<label for="trainingLevelInput'+i+'">Training Level</label>'+
		       '<select class="form-control select2" id="trainingLevelInput'+i+'" name="trainingLevel'+i+'" style="width: 100%" required>'+
 		         '<option value="all">All</option>'+
				 '<option value="intern">Intern</option>'+
		         '<option value="ca-1">CA-1</option>'+
		         '<option value="ca-2">CA-2</option>'+
		         '<option value="ca-3">CA-3</option>'+
		         '<option value="fellow">Fellow</option>'+
		       '</select>'+
		     '</div>'+
		     '<hr /><br />'+
		     '</div>';
		    }


		    $("#addNewSpecificReport").click(function(){
				var report = reportHtml(++numSpecificReports);
				$(report).appendTo(".modal-specRpt").slideDown();
				$(".datepicker").datepicker({
					dateFormat: "yy-mm-dd"
				});
		    });

		     $(".modal-specRpt").on("click", ".remove-report-group", function(){
		        $(this).parent().slideUp(function(){
					$(this).remove();
				});
		     });

		    function checkReportQuery(){
			//Checks the report queries to make sure the entered date is of the correct format because not all browsers support the html5 datepicker being used.
				dateError = false;
				$(this).find("input").each(function(){
					if($(this).attr("type") == "date" || $(this).hasClass("datepicker")){
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
				var month = d.getMonth()+1;
				month = ("0"+month).slice(-2); //converts possible M months to MM format
				var year = d.getFullYear();
				var date = year+"-"+month+"-"+day;
				$(this).parents(".report-options").find(".endDate").val(date);

				d.setMonth(d.getMonth()-6);
				day = d.getDate();
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

			function appendAlert(alertText, parent, alertType){
				alertType = (typeof(alertType) == "undefined" ? "danger" : alertType);

				var alert = document.createElement("div");
				alert.className = "alert alert-" + alertType + " alert-dismissable";
				alert.role = "alert";

				var close = document.createElement("button");
				close.type = "button";
				close.className = "close";
				close.dataset.dismiss = "alert";
				close.setAttribute("aria-label", "Close");

				var innerClose = document.createElement("span");
				innerClose.setAttribute("aria-hidden", "true");
				innerClose.innerHTML = "&times;";
				close.appendChild(innerClose);

				var text = document.createTextNode(alertText);
				alert.appendChild(close);
				alert.appendChild(text);

				$(parent).append(alert);
			}

			$(document).ready(function(){
				$.fn.dataTable.moment( "DD-MMM-YYYY h:mm A" );

				$(".report").submit(checkReportQuery);
		        $(".report").on("click", ".lastSixMonths", lastSixMonths);
		        $(".report").on("click", ".lastThreeMonths", lastThreeMonths);
				$(".datepicker").datepicker({
					dateFormat: "yy-mm-dd"
				});

				$.fn.select2.defaults.set("theme", "bootstrap");

				$(".select2").val(null).select2({
					placeholder: "Please select"
				});

				$("body").css("padding-top", $("#main-navbar").height()+5);
			});

			$(window).resize(function(){
				$("body").css("padding-top", $("#main-navbar").height()+5);
			});
		</script>
		@yield("script")
	</body>
</html>
