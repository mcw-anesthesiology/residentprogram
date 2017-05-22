<template>
	<div class="checkbox-question form-group">
		<fieldset :title="description">
			<legend>
				{{ text }}
			</legend>
			<div class="options">
				<label v-for="(option, index) of options" :title="option.description">
					<input type="checkbox" :value="option.value"
						:checked="option.checked" :disabled="readonly"
						@change="handleCheck(index)" />

					<input type="text" v-if="option.editable"
						class="form-control"
						:value="option.text"
						placholder="Other"
						@click="handleCheck(index)"
						@input="handleEditableOptionInput(index, $event.target.value)" />
					<template v-else>
						{{ option.text }}
					</template>

					<div v-if="option.description" class="question-description">
						{{ snarkdown(option.description) }}
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
		},
		readonly: {
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
		}
	},

	methods: {
		handleCheck(index) {
			let options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {
				checked: !options[index].checked
			});

			this.$emit('input', {options});
		},
		handleEditableOptionInput(index, value) {
			let options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {text: value, value});

			this.$emit('input', {options});
		},
		snarkdown
	},

	components: {
		ShowHideButton
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
</style>
