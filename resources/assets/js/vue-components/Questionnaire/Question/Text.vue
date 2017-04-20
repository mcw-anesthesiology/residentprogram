<template>
	<div class="form-group">
		<label class="containing-label" :title="description">
			{{ text }}
			<textarea v-if="type === 'texarea'" class="form-control"
				:value="value" @input="onInput"></textarea>
			<input type="text" v-else class="form-control"
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
				return ['text', 'textarea'].includes(type);
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
		properties: {
			type: Array,
			required: false
		},
		value: {
			type: String,
			default: ''
		}
	},
	
	computed: {
		markedUpDescription() {
			return snarkdown(this.description);
		}
	},
	
	methods: {
		onInput(event) {
			this.$emit('input', {value: event.target.value});
		}
	},
	
	components: {
		ShowHideButton
	}
};
</script>
