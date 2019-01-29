<template>
	<fieldset>
		<legend>
			Options
			<button type="button" class="btn btn-info btn-xs"
				@click="handleAddOption"
			>
				<span class="glyphicon glyphicon-plus"></span>
			</button>
		</legend>

		<ol class="options-list">
			<li class="options-list-item" v-for="(option, index) of value" :key="index">
				<div class="form-group">
					<label class="containing-label">
						Text
						<textarea class="form-control"
							:value="option.text"
							@input="handleOptionInput(index, 'text', $event.target.value)"
						></textarea>
					</label>
				</div>
				<div class="form-group">
					<label class="containing-label">
						Value
						<input v-if="type === 'text'"
							type="text"
							class="form-control"
							:value="option.value"
							@input="handleOptionInput(index, 'value', $event.target.value)"
						/>
						<input v-if="type === 'number'"
							type="number"
							class="form-control"
							:value="option.value"
							:step="step"
							@input="handleOptionInput(index, 'value', Number($event.target.value))"
						/>
						<input v-if="type === 'boolean'"
							type="checkbox"
							:checked="option.value"
							@change="handleOptionInput(index, 'value', $event.target.checked)"
						/>
					</label>
				</div>

				<div class="option-controls">
					<button type="button" class="btn btn-danger btn-xs"
						@click="handleRemoveOption(index)"
					>
						<span class="glyphicon glyphicon-remove"></span>
					</button>

					<div class="option-move-buttons-container">
						<button type="button" class="btn btn-default btn-xs"
							:disabled="index === 0"
							@click="handleMoveOption(index, index - 1)"
						>
							<span class="glyphicon glyphicon-arrow-up"></span>
						</button>

						<button type="button" class="btn btn-default btn-xs"
							:disabled="index === value.length - 1"
							@click="handleMoveOption(index, index + 1)"
						>
							<span class="glyphicon glyphicon-arrow-down"></span>
						</button>
					</div>
				</div>
			</li>
		</ol>
	</fieldset>
</template>

<style scoped>
	.options-list {
		padding: 1em;
	}

	.options-list-item {
		display: grid;
		grid-template-columns: 1fr 1fr 50px;
		grid-gap: 1em;
	}

	.option-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.option-controls > * {
		display: block;
		margin: 0.25em;
	}

	.options-move-buttons-container {
		display: flex;
		flex-direction: column;
	}
</style>


<script>
export default {
	props: {
		value: {
			type: Array,
			required: true
		},
		type: {
			type: String,
			default: 'text'
		},
		step: {
			type: String,
			required: false
		}
	},
	methods: {
		handleAddOption() {
			let value;
			switch (this.type) {
				case 'number':
					value = 0;
					break;
				case 'boolean':
					value = false;
					break;
				case 'string':
				default:
					value = '';
					break;
			}

			this.$emit(
				'input',
				this.value.concat({
					text: '',
					value
				})
			);
		},
		handleOptionInput(index, prop, optionValue) {
			if (prop === 'value') {
				switch (this.type) {
					case 'number':
						optionValue = Number(optionValue);
						break;
					case 'boolean':
						optionValue = Boolean(optionValue);
						break;
					case 'string':
					default:
						optionValue = String(optionValue);
				}
			}

			const value = this.value.slice();
			value[index] = {
				...value[index],
				[prop]: optionValue
			};
			this.$emit('input', value);
		},
		handleRemoveOption(index) {
			const value = this.value.slice();
			value.splice(index, 1);
			this.$emit('input', value);
		},
		handleMoveOption(index, newIndex) {
			const value = this.value.slice();

			const [option] = value.splice(index, 1);
			value.splice(newIndex, 0, option);

			this.$emit('input', value);
		}
	}
};
</script>
