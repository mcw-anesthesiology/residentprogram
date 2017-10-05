<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`">
		<div v-if="text" class="question-header panel-heading">
			<h3 class="question-title panel-title">
				<b>{{ ucfirst(questionId) }}: </b>
				<span v-html="renderedText"></span>
			</h3>
		</div>

		<div class="question-body panel-body">

			<template v-if="isOptionQuestion">
				<form-reader-question-option v-for="(option, index) of options"
					:key="index"
					v-bind="option"
					:questionType="questionType"
					:questionId="questionId"
					:required="required"
					:showDescription="showDescriptions"
					:readonly="readonly"
					@input="handleOptionInput(index, arguments[0])">
				</form-reader-question-option>
			</template>
			<div v-else class="question-option">
				<textarea v-if="questionType === 'text'" class="form-control"
					:name="questionId" :value="value"
					:required="required" :readonly="readonly"
					@input="handleInput">
				</textarea>

				<input type="number" v-if="questionType === 'number'" class="form-control"
					:name="questionId" :value="value"
					:required="required" :readonly="readonly"
					@input="handleInput" />
			</div>
		</div>

		<div v-if="showFooter" class="question-footer panel-footer">
			<div>
				<show-hide-button v-if="hasDescriptions" class="btn btn-info"
						v-model="showDescriptions">
					descriptions
				</show-hide-button>
				<button type="button" v-if="resettable" class="btn btn-default"
						:disabled="!hasResponse"
						@click="resetOptions">
					Reset response
				</button>
			</div>
			<div v-if="resettable">
				<p>
					<small>
						If you do not feel you are able to accurately respond to
						this question, please do not select any response.
						If you would like to clear your response, please press
						the <i>Reset response</i> button above.
					</small>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import snarkdown from 'snarkdown';

import FormReaderQuestionOption from './FormReaderQuestionOption.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

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
			required: false
		},
		value: {
			type: [String, Number],
			required: false
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
		hasResponse() {
			return this.isOptionQuestion
				? this.options.some(option => option.checked)
				: this.value;
		},
		hasDescriptions() {
			if (!this.options)
				return false;

			return this.options.some(option => option.description);
		},
		resettable() {
			return !this.readonly
				&& this.isOptionQuestion
				&& !this.required;
		},
		showFooter() {
			return this.hasDescriptions || this.resettable;
		},
		isOptionQuestion() {
			return [
				'radio',
				'radiononnumeric',
				'checkbox'
			].includes(this.questionType);
		},
		renderedText() {
			return snarkdown(this.text
				.replace('{{', '`{{')
				.replace('}}', '}}`'));
		}
	},

	methods: {
		ucfirst,
		resetOptions() {
			if (this.readonly)
				return;

			let options = this.options.map(option => Object.assign({}, option, {checked: false}));
			this.$emit('input', {options});
		},
		handleOptionInput(index, option) {
			if (this.readonly)
				return;

			let options = (['radiononnumeric', 'radio'].includes(this.questionType) && option.checked)
				? this.options.map(option => Object.assign({}, option, {checked: false}))
				: this.options.slice();
			options.splice(index, 1, Object.assign({}, options[index], option));
			this.$emit('input', {options});
		},
		handleInput(event) {
			if (this.readonly)
				return;

			this.$emit('input', {value: event.target.value});
		}
	},

	components: {
		FormReaderQuestionOption,
		ShowHideButton
	}
};
</script>
