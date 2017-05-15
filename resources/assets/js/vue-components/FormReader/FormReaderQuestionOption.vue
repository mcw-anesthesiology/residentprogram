<template>
	<div class="question-option">
		<label>
			<span :title="description">
				<input v-if="questionType === 'checkbox'" type="checkbox"
					:name="`${questionId}[]`" :value="value"
					:checked="checked" :required="required"
					:disabled="readonly" @change="handleInput" />
				<input v-else type="radio" :name="questionId" :value="value"
					:checked="checked" :required="required"
					:disabled="readonly" @change="handleInput" />
				<br />
				{{ text }}
			</span>
		</label>
		<div v-if="description" v-show="showDescription"
			class="description well"
			v-html="snarkdown(description)">
		</div>
		<slot></slot>
	</div>
</template>

<script>
import snarkdown from 'snarkdown';

export default {
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		},

		questionType: {
			type: String,
			required: true
		},
		questionId: {
			type: String,
			required: true
		},
		checked: {
			type: Boolean,
			default: false
		},
		
		required: {
			type: Boolean,
			default: false
		},

		showDescription: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		snarkdown,
		handleInput(event) {
			this.$emit('input', {checked: event.target.checked});
		}
	}
};
</script>
