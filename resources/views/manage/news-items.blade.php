@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
@verbatim
<div class="container body-block">
	<h1>News</h1>

	<component-list :items="newsItems" :fields="['heading', 'body', 'audience']"
			reloadable @reload="fetchNewsItems">
		<template slot-scope="item">
			<div class="component-list-item row">
				<div class="col-sm-2">
					<small>Heading</small>
					{{ item.heading }}
				</div>
				<div class="col-sm-6">
					<small>Body</small>
					<div v-html="item.body"></div>
				</div>
				<div class="col-sm-2">
					<small>Audience</small>
					{{ item.audience }}
				</div>
				<div class="col-sm-2">
					<small>Created</small>
					<rich-date :date="item.created_at" />
				</div>
			</div>
		</template>
	</component-list>

	<div v-if="show.addItem" v-cloak>
		<form @submit="handleAddNewsItem" class="form">
			<div class="form-group">
				<label class="containing-label">
					Heading
					<input type="text" class="form-control"
						v-model="heading" />
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Body
					<markdown-editor v-model="body.md"
						@html="body.html = arguments[0]" />
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Audience
					<select class="form-control" v-model="audience">
						<option v-for="option of audienceOptions"
								:value="option">
							{{ kebabCaseToWords(option) }}
						</option>
					</select>
				</label>
			</div>

			<div class="text-right">
				<button type="button" class="btn btn-default"
						@click="show.addItem = false">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary">
					Add news item
				</button>
			</div>
		</form>
	</div>
	<button v-else type="button" class="btn btn-primary"
			@click="show.addItem = true">
		Add news item
	</button>

	<alert-list v-model="alerts" />
</div>
@endverbatim
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageNewsItems('main');
	</script>
@endpush
