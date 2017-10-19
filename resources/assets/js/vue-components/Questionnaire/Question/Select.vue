<template>
	<validated-form-group class="select-question"
			:errors="validation.errors"
			:show-errors="showErrors"
			prop="options">
		<label class="containing-label" :title="description">
			{{ text }}
			<select class="form-control" :disabled="readonly"
					@change="handleSelect">
				<option value="">{{ placeholder }}</option>
				<option v-for="(option, index) of options" :key="index"
						:value="option.value"
						:selected="option.selected">
					{{ option.text }}
				</option>
			</select>
		</label>

		<show-hide-button v-if="description"
				class="btn-default"
				v-model="show.description">
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

import { selectQuestion as validate } from '@/modules/questionnaire/validate.js';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'select';
			}
		},
		text: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			default: 'Please select an option'
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
		handleSelect(event) {
			const value = event.target.value;
			const options = this.options.map(option => {
				option = Object.assign({}, option);

				// Because html values are always strings
				// eslint-disable-next-line eqeqeq
				option.selected = (option.value == value);

				return option;
			});
			this.$emit('input', {options});
		}
	},

	components: {
		ShowHideButton,
		ValidatedFormGroup
	}
};
</script>
