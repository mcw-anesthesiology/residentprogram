<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`">
		<div v-if="text" class="question-header panel-heading">
			<h3 class="question-title panel-title">
				<b>{{ ucfirst(id) }}: </b>
				<span v-html="md.renderInline(text)"></span>
			</h3>
		</div>

		<div class="question-body panel-body">

			<form-reader-question-option v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)"
					v-for="option of options" v-bind="option" :questionType="questionType"
					:questionId="id" :required="required" :showDescription="showDescriptions" />

			<div v-else class="question-option">
				<textarea v-if="questionType === 'text'" class="form-control"
					:name="id" :required="required"></textarea>

				<input type="number" v-if="questionType === 'number'" class="form-control"
					:name="id" :required="required" />
			</div>
		</div>

		<div v-if="hasDescriptions" class="question-footer panel-footer">
			<div class="question-description-toggle">
				<button type="button" class="btn btn-info"
						@click="showDescriptions = !showDescriptions">
					<span class="glyphicon" :class="showDescriptions ? 'glyphicon-zoom-out' : 'glyphicon-zoom-in'"></span>
					{{ showDescriptions ? 'Hide descriptions' : 'Show descriptions' }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import FormReaderQuestionOption from './FormReaderQuestionOption.vue';

import MarkdownIt from 'markdown-it';

import { ucfirst } from '../../modules/utils.js';

const md = new MarkdownIt();

export default {
	props: {
		id: String,
		text: String,
		type: String,
		questionType: String,
		required: Boolean,
		weight: Number,
		options: Array
	},
	data(){
		return {
			showDescriptions: false
		};
	},
	computed: {
		hasDescriptions(){
			let hasDescriptions = false;

			if(this.options)
				this.options.map(option => {
					if(option.description)
						hasDescriptions = true;
				});

			return hasDescriptions;
		},
		md(){
			return md;
		}
	},

	methods: {
		ucfirst
	},

	components: {
		FormReaderQuestionOption
	}
}
</script>
