@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
@verbatim
<div class="container body-block">
	<h1>Highlighted questions</h1>

	<highlighted-question-editor v-if="show.editor"
			@close="show.editor = false"
			@submit="handleAdd">
	</highlighted-question-editor>
	<button type="button" class="btn btn-success"
			@click="show.editor = true">
		<span class="glyhpicon glyphicon-plus"></span>
		Add
	</button>

	<component-list v-if="highlightedQuestions"
			:items="highlightedQuestions"
			:fields="['highlight_name']">
		<template slot-scope="hq">
			<highlighted-question
				v-bind="hq"
				:forms="forms"
				:form-groups="formGroups"
				@update="handleUpdate(hq.id, ...arguments)">
			</highlighted-question>
		</template>
	</component-list>
</div>
@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageHighlightedQuestions('main');
	</script>
@endpush
