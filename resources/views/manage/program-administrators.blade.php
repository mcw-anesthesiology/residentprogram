@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
@verbatim
<div class="container body-block">
	<h1>Program administrators</h1>

	<component-list v-if="programAdministrators"
				 :items="programAdministrators"
				 :fields="programAdministratorFields">
		<template slot-scope="pa">
			<div class="row">
				<div class="col-sm-3">
					<span>{{ pa.user.full_name }}</span>
				</div>
				<div class="col-sm-3">
					<span>{{ ucfirst(pa.type) }}</span>
				</div>
				<div class="col-sm-3">
					<span>{{ renderTrainingLevel(pa.training_level) }}</span>
				</div>
				<div class="col-sm-3">
					<span>{{ renderSecondaryTrainingLevel(pa.secondary_training_level) }}</span>
				</div>
			</div>
		</template>
	</component-list>
</div>
@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageProgramAdministrators('main');
	</script>
@endpush
