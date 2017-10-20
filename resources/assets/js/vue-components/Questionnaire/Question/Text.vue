<template>
	<validated-form-group class="text-question"
			:errors="validation.errors"
			:show-errors="showErrors"
			:invalid-class="helpClass"
			prop="value">
		<label class="containing-label control-label" :title="description">
			{{ text }}
			<textarea class="form-control"
				:value="value" :readonly="readonly"
				@input="onInput"></textarea>
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

import { textQuestion as validate } from '@/modules/questionnaire/validate.js';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return ['text', 'textarea'].includes(type);
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
		value: {
			type: String,
			default: ''
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
			this.$emit('input', {value: event.target.value});
		}
	},

	components: {
		ShowHideButton,
		ValidatedFormGroup
	}
};
</script>
