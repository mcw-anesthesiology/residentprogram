@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<merit-checklist v-bind="JSON.parse(form.form)" :user="user" readonly previewing />
	</div>
@endsection

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			form: {!! $form->toJson() !!}
		};

		var vm = createViewMeritReportForm('main', propsData);
	</script>
@endpush
