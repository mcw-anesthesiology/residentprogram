<template>
	<div class="professionalism-question-list-item">
		<div class="professionalism-question-id">
			<labeled-value label="#">
				<router-link :to="professionalismQuestion.id" append>
					{{ professionalismQuestion.id }}
				</router-link>
			</labeled-value>
		</div>

		<div class="professionalism-question-title">
			<labeled-value label="Title">
				<span>{{ professionalismQuestion.title }}</span>
			</labeled-value>
		</div>

		<div class="professionalism-question-text">
			<labeled-value label="Text">
				<span>{{ professionalismQuestion.text }}</span>
			</labeled-value>
		</div>

		<div class="controls">
			<router-link :to="professionalismQuestion.id" append class="btn btn-info">
				<span class="glyphicon glyphicon-edit"></span>
				Edit
			</router-link>
		</div>
	</div>
</template>

<style scoped>
	.professionalism-question-list-item {
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

	.professionalism-question-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.professionalism-question-list-item + .professionalism-question-list-item {
		border-top: 1px solid #aaa;
	}

	.professionalism-question-id {
		grid-area: id;
	}

	.professionalism-question-title {
		grid-area: title;
	}

	.professionalism-question-text {
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
		professionalismQuestion: {
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
