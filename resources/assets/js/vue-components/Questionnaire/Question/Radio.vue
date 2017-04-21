<template>
	<div class="form-group">
		<fieldset :title="description">
			<legend>
				{{ text }}
			</legend>
			<label v-for="(option, index) of options" :title="option.description">
				{{ option.text }}
				<input type="radio" :value="option.value" :checked="option.checked"
					@change="onCheck(index)" />
				<div v-if="option.description" class="question-description">
					{{ snarkdown(option.description) }}
				</div>
			</label>
		</fieldset>
		<show-hide-button v-if="description" v-model="show.description">
			description
		</show-hide-button>
		<div v-if="description" v-show="show.description">
			{{ markedUpDescription }}
		</div>
	</div>
</template>

<script>
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

export default {
	model: {
		prop: 'options'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'radio';
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
		}
	},
	
	methods: {
		onCheck(index) {
			let options = this.options.map((option, i) => {
				let newOption = Object.assign({}, option);
				
				newOption.checked = (i === index);
				
				return newOption;
			});
			
			this.$emit('input', {options});
		},
		snarkdown
	},
	
	components: {
		ShowHideButton
	}
};
</script>
