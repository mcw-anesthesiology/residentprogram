<template>
	<fieldset :class="{ highlighted }">
		<label v-for="option of options"
			:class="{ selected: isSelected(option) }"
		>
			<input type="radio"
				:name="name"
				:value="option.value"
				:checked="isSelected(option)"
				:required="required"
				:disabled="readonly"
				@change="handleChange($event, option)"
			/>
			<span v-if="showValue" class="value">
				{{ option.value }}
			</span>
			<span class="text">
				{{ transformOptionText(option.text) }}
			</span>
		</label>

		<bootstrap-alert v-if="highlighted">
			<p>Please select a response.</p>
		</bootstrap-alert>
	</fieldset>
</template>

<style scoped>
	fieldset {
		display: flex;
		flex-wrap: wrap;
		background-color: #fafafa;
		border-top: 1px solid #dedede;
		padding: 1em;
	}

	label {
		flex: 1 1 50%;
		display: flex;
		align-items: center;
		margin: 1em;
		padding: 1.5em;
		border: 1px solid #ccc;
		border-radius: 2px;
		background-color: white;
		font-weight: normal;
		line-height: 1.5;
		opacity: 0.75;
	}

	label:hover,
	label:focus,
	label.selected {
		opacity: 1;
	}

	label input {
		vertical-align: middle;
		margin: 0 1em 0 0;
	}

	fieldset:not(.highlighted) input:invalid {
		box-shadow: none;
	}

	fieldset .alert {
		flex: 1 0 100%;
	}

	.value {
		font-size: 2em;
		font-weight: bold;
		margin-right: 1em;
	}
</style>

<script>
import { logError } from '@/modules/errors.js';

export default {
	props: {
		value: {
			required: true
		},
		options: {
			type: Array,
			required: true
		},
		name: {
			type: String,
			required: false
		},
		showValue: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: true
		},
		highlighted: {
			type: Boolean,
			default: false
		},
		evaluation: {
			type: Object,
			required: false
		}
	},
	methods: {
		isSelected(option) {
			return this.value === option.value;
		},
		transformOptionText(optionText) {
			try {
				if (this.evaluation && this.evaluation.subject) {
					const subject = this.evaluation.subject;
					return optionText.replace(/(this|the) resident/gi, `${subject.first_name} ${subject.last_name}`);
				}
			} catch (err) {
				logError(err);
			}
			return optionText;
		},
		handleChange(event, option) {
			if (!this.readonly && event.target.checked) {
				this.$emit('change', option);
			}
		}
	},
	components: {
		BootstrapAlert: () => import('#/BootstrapAlert.vue')
	}
};
</script>
