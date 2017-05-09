<template>
	<div>
		<h2 v-if="title">
			{{ title }}
		</h2>
		<template v-for="(item, index) of contents.items">
			<form-reader-question v-if="item.type === 'question'"
				v-bind="item"
				:readonly="readonly"
				@input="handleInput(index, arguments[0])" />
			<div v-if="item.type === 'instruction'"
				class="instruction-block"
				v-html="snarkdown(item.text)">
			</div>
		</template>

		<div v-if="!readonly" class="btn-lg-submit-container">
			<button type="button" class="btn btn-lg btn-default"
					@click="handleSave">
				Save
			</button>
			<button type="button" class="btn btn-lg btn-primary"
					@click="handleSubmit">
				Submit
			</button>
		</div>
	</div>
</template>

<script>
import FormReaderQuestion from './FormReaderQuestion.vue';

import snarkdown from 'snarkdown';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		contents: {
			type: Object,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		snarkdown,
		handleInput(index, question) {
			if (this.readonly)
				return;

			let items = this.contents.items.slice();
			items.splice(index, 1, Object.assign({}, this.contents.items[index], question));
			let contents = Object.assign({}, contents, {items});
			this.$emit('input', {contents});
		},
		handleSave() {
			if (!this.readonly)
				this.$emit('save', {
					contents: this.contents
				});
		},
		handleSubmit() {
			if (!this.readonly)
				this.$emit('submit', {
					contents: this.contents
				});
		}
	},

	components: {
		FormReaderQuestion
	}
};
</script>

<style scoped>
	h2 {
		margin-bottom: 2em;
	}

	.instruction-block {
		font-size: 1.25em;
		padding: 1.5em;
	}
</style>
