<template>
	<div class="form-group">
		<fieldset :title="description">
			<legend>
				{{ text }}
			</legend>
			<label v-for="(option, index) of options" :title="option.description">
				{{ option.text }}
				<input type="checkbox" :value="option.value" :checked="option.checked"
					@change="onCheck(index)" />
				<div v-if="option.description" class="question-description">
					{{ snarkdown(option.description) }}
				</div>
			</label>
		</fieldset>
		<show-hide-button v-model="show.description">
			description
		</show-hide-button>
		<div v-show="show.description" class="question-description">
			{{ markedUpDescription }}
		</div>
	</div>
</template>

<script>
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

export default {
	model: {
		prop: 'options',
		event: 'change'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'checkbox';
			}
		},
		text: {
			type: String
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		}
	},
	
	computed: {
		markedUpDescription() {
			return snarkdown(this.description);
		}
	},
	
	methods: {
		onCheck(index) {
			let options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {
				selected: !options[index].selected
			});
			
			this.$emit('change', options);
		},
		snarkdown
	},
	
	components: {
		ShowHideButton
	}
};
</script>
