<template>
	<validated-form-group class="checkbox-question"
			:errors="validation.errors"
			:show-errors="showErrors"
			:invalid-class="helpClass"
			prop="options">
		<fieldset :title="description">
			<legend class="control-label">
				{{ text }}
			</legend>
			<div class="options">
				<label v-for="(option, index) of options"
						class="control-label"
						:title="option.description">
					<input type="checkbox" :value="option.value"
						:checked="option.checked" :disabled="readonly"
						@change="handleCheck(index)" />

					<input type="text" v-if="option.editable"
						class="form-control editable-option-text"
						:value="option.text"
						:readonly="readonly"
						placeholder="Other"
						@click="handleCheck(index)"
						@input="handleEditableOptionInput(index, $event.target.value)" />
					<template v-else>
						{{ option.text }}
					</template>

					<div v-if="option.description" class="question-description"
						v-html="snarkdown(option.description)">
					</div>
				</label>
			</div>
		</fieldset>

		<show-hide-button v-if="description" v-model="show.description">
			description
		</show-hide-button>
		<div v-if="description" v-show="show.description">
			{{ markedUpDescription }}
		</div>
	</validated-form-group>
</template>

<script>
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import snarkdown from 'snarkdown';

import { checkboxQuestion as validate } from '@/modules/questionnaire/validate.js';

export default {
	model: {
		prop: 'options'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'checkbox';
			}
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		},
		required: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		helpClass: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			show: {
				description: false
			}
		};
	},

	computed: {
		markedUpDescription() {
			if (this.description)
				return snarkdown(this.description);
		},
		validation() {
			return validate(this);
		}
	},

	methods: {
		snarkdown,
		handleCheck(index) {
			if (this.readonly)
				return;

			let options = this.options.slice();
			options[index] = Object.assign({}, options[index], {
				checked: !options[index].checked
			});

			this.$emit('input', {options});
		},
		handleEditableOptionInput(index, value) {
			if (this.readonly)
				return;

			let options = this.options.slice();
			options[index] = Object.assign({}, options[index], {text: value, value});

			this.$emit('input', {options});
		}
	},

	components: {
		ShowHideButton,
		ValidatedFormGroup
	}
};
</script>

<style scoped>
	.checkbox-question {
		font-size: 1.25em;
	}

	legend {
		margin: 0;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
	}

	.options label {
		padding: 1em;
	}

	.editable-option-text {
		display: inline-block;
		width: auto;
	}
</style>
