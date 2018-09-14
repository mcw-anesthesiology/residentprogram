<div id="main-navbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
	<div class="navbar-header">
	  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		<span class="sr-only">Toggle navigation</span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	  </button>
	  <a class="navbar-brand" href="/">{{ config('app.name') }}</a>
	</div>
@if (Auth::check() && !empty($user))
	<div class="navbar-collapse collapse">
	  <ul class="nav navbar-nav navbar-right">
@if (config('features.evaluations'))
	@if ($user->isType("resident"))
		@if (config('features.trainee_evaluations'))
		<li><a href="/request">Request Evaluation</a></li>
		@endif

		@if (config('features.intern360_evaluations'))
			@if ($user->isType('intern'))
				<li><a href="/request/intern360">Request Intern 360 Evaluation</a></li>
			@else
				<li><a href="/request/intern360">Evaluate Intern</a></li>
			@endif
		@endif

		@if (config('features.faculty_evaluations'))
		<li><a href="/request/faculty">Evaluate Faculty</a></li>
		@endif

		<li><a href="/dashboard">View Evaluations</a></li>

	@elseif ($user->isType("faculty"))
		@if (config('features.trainee_evaluations'))
		<li><a href="/request">Trainee Evaluation</a></li>
		@endif

		@if (config('features.app_evaluations'))
		<li><a href="/request/app">APP Evaluation</a></li>
		@endif

		<li><a href="/dashboard">View Evaluations</a></li>

		@if (config('features.faculty_evaluations'))
		<li><a href="/dashboard/faculty">View Faculty Evaluations</a></li>
		@endif

	@elseif (config('features.app_evaluations') && $user->isType('app'))
		<li><a href="/request/app">Request evaluation</a></li>

	@elseif ($user->isType("staff"))
		<li><a href="/request/staff">Create Evaluation</a></li>
		<li><a href="/dashboard">View Evaluations</a></li>

	@elseif ($user->isType("admin"))
		<li class="dropdown">
            <a href="#" data-toggle="dropdown">Request Evaluation<b class="caret"></b></a>
            <ul class="dropdown-menu">
		@if (config('features.trainee_evaluations'))
                <li><a href="/request">Trainee Evaluation</a></li>
				<li><a href="/request/self">Self Evaluation</a></li>
				<li><a href="/request/staff">Staff Evaluation</a></li>
		@endif
		@if (config('features.app_evaluations'))
				<li><a href="/request/app">APP Evaluation</a></li>
		@endif
		@if (config('features.faculty_evaluations'))
                <li><a href="/request/faculty">Faculty Evaluation</a></li>
		@endif
        @if (config('features.intern360_evaluations'))
                <li><a href="/request/intern360">Intern 360 Evaluation</a></li>
        @endif
            </ul>
        </li>

		<li><a href="/dashboard/faculty">Faculty Evaluations</a></li>
	@endif
@endif

@if ($user->isType('admin'))
		<li class="dropdown">
		  <a href="#" data-toggle="dropdown">Manage<b class="caret"></b></a>
		  <ul class="dropdown-menu">
            <li><a href="/manage/accounts">Accounts</a></li>

		@if (config('features.evaluations'))
			<li><a href="/manage/evaluations">Evaluations</a></li>
			<li><a href="/manage/forms">Forms</a></li>
			<li><a href="/manage/watched-forms">Watched forms</a></li>
			<li><a href="/manage/scheduled-requests">Scheduled Requests</a></li>
		@endif
		@if (config('features.trainee_evaluations'))
			<li><a href="/manage/milestones-competencies">Milestones/Competencies</a></li>
			<li><a href="/manage/mentors">Mentors</a></li>
			<li><a href="/manage/block-assignments">Block Assignments</a></li>
			<li><a href="/manage/program-administrators">Program Administrators</a></li>
		@endif

		@if (config('features.alumni'))
            <li><a href="/manage/alumni">Alumni</a></li>
		@endif
			<li><a href="/manage/user-features">User features</a></li>
		@if (config('features.case_log'))
			<li><a href="/manage/case-logs">Case logs</a></li>
		@endif
		@if (config('features.faculty_merit'))
            <li><a href="/manage/merit">Merit</a></li>
		@endif
		@if (config('features.faculty360'))
			<li><a href="/manage/faculty360">Faculty 360</a></li>
		@endif
        @if (config('features.news'))
            <li><a href="/manage/news-items">News items</a></li>
        @endif
        @if (config('features.highlighted-questions'))
            <li><a href="/manage/highlighted-questions">Highlighted questions</a></li>
        @endif
		  </ul>
		</li>
@endif

@if (config('features.case_log') && ($user->isType("admin") || $user->usesFeature(config("constants.FEATURES.CASE_LOG"))))
		<li><a href="/case-log">Case log</a></li>
@endif

@if (config('features.faculty_merit') && ($user->isType('admin') || $user->isType('faculty') || $user->usesFeature('FACULTY_MERIT')))
		<li><a href="/merit">Faculty merit</a></li>
@endif

@if (config('features.evaluations'))
	@if ($user->isType("admin"))
		<li><a href="/reports">Reports</a></li>
	@elseif ($user->isType(['resident', 'faculty']))
        <li class="dropdown">
		  <a href="#" data-toggle="dropdown">
            Reports<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
        @if (
            $user->isType('resident')
            || (
                $user->isType('faculty')
                && !empty($reportableUserGroups)
            )
        )
            <li>
                <a class="viewSpecRpt pointer" data-toggle="modal"
                        data-target=".bs-specRpt-modal" id="viewSpecRpt">
                    Trainee report
                </a>
            </li>
        @endif
            <li><a href="/case-overlaps">Case overlaps</a></li>
          </ul>
        </li>
	@endif
@endif
		<li><a href="/contact">Contact</a></li>

	@if (config('features.calendar'))
		<li><a href="/calendar">Calendar</a></li>
	@endif

	@if (config('features.external_links') && !empty(config('app.external_links')))
		@foreach (config('app.external_links') as $name => $link)
		<li><a href="{{ $link }}">{{ $name }}</a></li>
		@endforeach
	@endif
	@if (config('features.news'))
		<li id="global-news-dropdown" class="dropdown" :class="{open: open}"
				@click="ignoreDropdownClick">
			<a href="#" @click="toggleDropdown">
				News
				<span v-if="newsItems && newsItems.length" v-cloak
						class="badge badge-info">
					<span class="glyphicon glyphicon-bell"></span>
					@{{ newsItems.length }}
				</span>
			</a>
			<span ref="menu" class="dropdown-menu"
					:class="{'dropdown-menu-left': left}">
				<news-list :items="newsItems"
					@remove="handleRemove"></news-list>
			</span>
		</li>
	@endif
		<li class="dropdown">
		  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			  Welcome, {{ ucfirst($user->first_name) }} {{ucfirst($user->last_name)}}
	@if ($user->type == "faculty")
		@if ($user->evaluatorEvaluations->where("status", "pending")->count() > 0)
				<span class="badge">
					<span class="glyphicon glyphicon-inbox"></span>
					{{ $user->evaluatorEvaluations->where("status", "pending")->count() }}
				</span>
		@endif
	@endif
				<b class="caret"></b>
			</a>
		  <ul class="dropdown-menu">
            <li class="disabled"><a>Account type: {{ ucfirst($user->specific_type) }}</a></li>
			<li><a href="/user">Manage Account</a></li>
	@if (config('features.evaluations'))
			<li><a href="/help">Help</a></li>
	@endif
			<li><a class="pointer" data-toggle="modal" data-target="#attribution-modal">Attributions</a></li>
			<li><a href="/logout">Logout</a></li>
		  </ul>
		</li>
	  </ul>
	</div>
@endif
  </div>
</div>
