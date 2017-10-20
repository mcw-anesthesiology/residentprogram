<template>
	<validated-form-group class="number-question"
			:errors="validation.errors"
			:show-errors="showErrors"
			:invalid-class="helpClass"
			prop="value">
		<label class="containing-label control-label" :title="description">
			{{ text }}
			<input type="number" class="form-control"
				:min="min" :max="max" :value="value" :readonly="readonly"
				@input="onInput" />
		</label>
		<show-hide-button v-if="description" v-model="show.description">
			description
		</show-hide-button>
		<div v-if="description" v-show="show.description"
			v-html="markedUpDescription">
		</div>
	</validated-form-group>
</template>

<script>
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import snarkdown from 'snarkdown';

import { numberQuestion as validate } from '@/modules/questionnaire/validate.js';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'number';
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
		placeholder: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		properties: {
			type: Array,
			required: false
		},
		value: {
			type: Number,
			default: null
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
		onInput(event) {
			// FIXME: Firefox sends a 0 for non-numbers for some reason
			this.$emit('input', {value: Number(event.target.value)});
		}
	},

	components: {
		ShowHideButton,
		ValidatedFormGroup
	}
};
</script>
