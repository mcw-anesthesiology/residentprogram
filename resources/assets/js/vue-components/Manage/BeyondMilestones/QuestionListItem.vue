<template>
	<div class="question-list-item">
		<div class="question-id">
			<labeled-value label="#">
				<router-link :to="question.id" append>
					{{ question.id }}
				</router-link>
			</labeled-value>
		</div>

		<div class="question-title">
			<labeled-value label="Title">
				<span>{{ question.title }}</span>
			</labeled-value>
		</div>

		<div class="question-text">
			<labeled-value label="Text">
				<span>{{ question.text }}</span>
			</labeled-value>
		</div>

		<div class="controls">
			<router-link :to="question.id" append class="btn btn-info">
				<span class="glyphicon glyphicon-edit"></span>
				Edit
			</router-link>
		</div>
	</div>
</template>

<style scoped>
	.question-list-item {
		padding: 1em;
		display: grid;
		grid-template-columns: 1fr 2fr 2fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'id title text controls'
			'forms-editor forms-editor forms-editor forms-editor';
		grid-gap: 0.5em;
		font-size: 1.1em;
	}

	.question-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.question-list-item + .question-list-item {
		border-top: 1px solid #aaa;
	}

	.question-id {
		grid-area: id;
	}

	.question-title {
		grid-area: title;
	}

	.question-text {
		grid-area: text;
	}

	.controls {
		grid-area: controls;
		display: flex;
		flex-direction: column;
	}

	.controls .btn {
		display: block;
		margin: 0.25em;
		text-align: center;
	}
</style>

<script>
import LabeledValue from '#/LabeledValue.vue';

import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		question: {
			type: Object,
			required: true
		}
	},
	methods: {
		ucfirst
	},
	components: {
		LabeledValue
	}
};
</script>
