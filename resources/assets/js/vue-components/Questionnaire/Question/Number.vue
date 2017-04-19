<template>
	<div class="form-group">
		<label class="containing-label" :title="description">
			{{ text }}
			<input type="number" :min="min" :max="max"
				:value="value" @input="onInput" />
		</label>
		<show-hide-button v-model="show.description">
			description
		</show-hide-button>
		<div v-show="show.description">
			{{ markedUpDescription }}
		</div>
	</div>
</template>

<script>
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'number';
			}
		},
		text: {
			type: String
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
		}
	},
	
	computed: {
		markedUpDescription() {
			return snarkdown(this.description);
		}
	},
	
	methods: {
		onInput(event) {
			this.$emit('input', Number(event.target.value));
		}
	},
	
	components: {
		ShowHideButton
	}
};
</script>
