<div id="main-navbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
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
                <li><a href="/request">Trainee Evaluation</a></li>
                <li><a href="/request/staff">Staff Evaluation</a></li>
                <li><a href="/request/faculty">Faculty Evaluation</a></li>
                <li><a href="/request/self">Self Evaluation</a></li>
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
            <li><a href="/manage/watched-forms">Watched forms</a></li>
			<li><a href="/manage/block-assignments">Block Assignments</a></li>
            <li><a href="/manage/alumni">Alumni</a></li>
			<li><a href="/manage/user-features">User features</a></li>
			<li><a href="/manage/case-logs">Case logs</a></li>
		  </ul>
		</li>
	  @endif
	  @if($user->isType("admin") || $user->usesFeature(config("constants.FEATURES.CASE_LOG")))
		<li><a href="/case-log">Case log</a></li>
	  @endif
	  @if($user->isType("admin"))
		<li><a href="/reports">Reports</a></li>
	  @elseif($user->type == "resident" || ($user->type == "faculty" && $user->mentees()->count() > 0))
		<li><a class="viewSpecRpt pointer" data-toggle="modal" data-target=".bs-specRpt-modal" id="viewSpecRpt">Report</a></li>
	  @endif
		<li><a href="/contact">Contact</a></li>
        <li><a href="/directory">Pager Directory</a></li>
		<li><a href="/calendar">Calendar</a></li>
        <li><a href="https://www.dayoff.site">Day Off</a></li>
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
            <li class="disabled"><a>Account type: {{ ucfirst($user->specific_type) }}</a></li>
			<li><a href="/user">Manage Account</a></li>
            <li><a class="pointer" data-toggle="modal" data-target=".help-modal">Help</a></li>
			<li><a href="/logout">Logout</a></li>
		  </ul>
		</li>
	  </ul>
	</div>
  </div>
</div>
