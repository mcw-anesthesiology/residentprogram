@extends('app')

@section('blockless-body')
@verbatim

<div>
	<div class="container body-block">
		<h1>Beyond milestones</h1>
		<nav>
			<ul class="nav nav-pills">
				<router-link tag="li" to="/scenarios" active-class="active">
					<a>Scenarios</a>
				</router-link>
				<router-link tag="li" to="/professionalism-questions" active-class="active">
					<a>Professionalism Questions</a>
				</router-link>
				<router-link tag="li" to="/additional-questions" active-class="active">
					<a>Additional questions</a>
				</router-link>
			</ul>
		</nav>
	</div>


	<router-view></router-view>
</div>

@endverbatim
@endsection

@push('scripts')
	<script>
		createManageBeyondMilestones('main');
	</script>
@endpush
