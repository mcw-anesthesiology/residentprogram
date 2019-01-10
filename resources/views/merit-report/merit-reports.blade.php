@extends('app')

@section('blockless-body')
	<transition name="merit-view">
		<router-view :user="user"
			:current-user="user"
			:merit-report-types="meritReportTypes"
			:merit-report-type-forms="meritReportTypeForms"
			@close="handleClose"
			@alert="alerts.push(arguments[0])">
		</router-view>
	</transition>
@stop

@push('stylesheets')
	<style>
		.merit-view-enter-active,
		.merit-view-leave-active {
			transition: transform 0.2s ease, opacity 0.2s ease;
		}

		.merit-view-enter-to,
		.merit-view-leave {
			transform: none;
			opacity: 1;
		}

		.merit-view-enter,
		.merit-view-leave-to {
			transform: translateX(100vw);
			opacity: 0.35;
		}
	</style>
@endpush

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			meritReportTypes: {!! json_encode($meritReportTypes) !!},
			meritReportTypeForms: {!! json_encode($meritReportTypeForms) !!}
		};

		createMeritReportsHub('main', propsData);
	</script>
@endpush
