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
	  @if($user->isType("resident"))
		<li><a href="/request">Request Evaluation</a></li>
		<li><a href="/request/faculty">Evaluate Faculty</a></li>
		<li><a href="/dashboard">View Evaluations</a></li>
	  @elseif($user->isType("faculty"))
		<li><a href="/request">Create Evaluation</a></li>
		<li><a href="/dashboard">View Evaluations</a></li>
		<li><a href="/dashboard/faculty">View Faculty Evaluations</a></li>
	  @elseif($user->isType("staff"))
		<li><a href="/request/staff">Create Evaluation</a></li>
		<li><a href="/dashboard">View Evaluations</a></li>
	  @elseif($user->isType("admin"))
		<li class="dropdown">
            <a href="#" data-toggle="dropdown">Request Evaluation<b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a href="/request">Resident Evaluation</a></li>
                <li><a href="/request/staff">Staff Evaluation</a></li>
                <li><a href="/request/faculty">Faculty Evaluation</a></li>
            </ul>
        </li>
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
            <li><a class="pointer" data-toggle="modal" data-target="#form-report-modal">Form Report</a></li>
			<li><a class="pointer" data-toggle="modal" data-target="#faculty-report-modal">Faculty Report</a></li>
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
