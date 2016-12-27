<template>
	<div>
		<h2 v-if="title">
			{{ title }}
		</h2>
		<template v-for="item of items">
			<form-reader-question v-if="item.type === 'question'" v-bind="item" />
			<div v-if="item.type === 'instruction'">

			</div>
		</template>
	</div>
</template>

<script>
import FormReaderQuestion from './FormReaderQuestion.vue';

export default {
	props: {
		title: String,
		items: Array
	},

	components: {
		FormReaderQuestion
	}
};
</script>
