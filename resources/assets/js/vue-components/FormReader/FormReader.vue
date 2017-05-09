<template>
	<div>
		<h2 v-if="title">
			{{ title }}
		</h2>
		<template v-for="item of contents.items">
			<form-reader-question v-if="item.type === 'question'"
				v-bind="item"
				:readonly="readonly" />
			<div v-if="item.type === 'instruction'"
				v-html="snarkdown(item.text)">
			</div>
		</template>
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
		snarkdown
	},

	components: {
		FormReaderQuestion
	}
};
</script>
