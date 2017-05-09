<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`">
		<div v-if="text" class="question-header panel-heading">
			<h3 class="question-title panel-title">
				<b>{{ ucfirst(questionId) }}: </b>
				<span v-html="snarkdown(text)"></span>
			</h3>
		</div>

		<div class="question-body panel-body">

			<form-reader-question-option v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)"
					v-for="option of options" v-bind="option" :questionType="questionType"
					:questionId="questionId" :required="required" :showDescription="showDescriptions"
					:readonly="readonly" />

			<div v-else class="question-option">
				<textarea v-if="questionType === 'text'" class="form-control"
					:name="questionId" :required="required" :readonly="readonly">
				</textarea>

				<input type="number" v-if="questionType === 'number'" class="form-control"
					:name="questionId" :required="required" :readonly="readonly" />
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
import snarkdown from 'snarkdown';

import FormReaderQuestionOption from './FormReaderQuestionOption.vue';

import { ucfirst } from 'modules/utils.js';

export default {
	props: {
		questionId: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
			validate(type) {
				return type === 'question';
			}
		},
		questionType: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
			default: false
		},
		weight: {
			type: Number,
			default: 100
		},
		options: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
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
		}
	},

	methods: {
		ucfirst,
		snarkdown
	},

	components: {
		FormReaderQuestionOption
	}
};
</script>
