@extends('app')

@section('blockless-body')
@verbatim

<div>
	<h1>Beyond milestones</h1>

	<manage-scenarios></manage-scenarios>
	<manage-professionalism-questions></manage-professionalism-questions>
</div>

@endverbatim
@endsection

@push('scripts')
	<script>
		createManageBeyondMilestones('main');
	</script>
@endpush
