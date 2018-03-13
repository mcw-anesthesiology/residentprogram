<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<span class="panel-title">
				{{ highlight_name }}
			</span>
		</div>
		<div class="panel-body">
			<div v-for="(responses, response) of responseMap" :key="response"
					class="hq-response">
				<p class="response">
					{{ response }}
				</p>
				<p class="count">
					{{ responses.length }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.panel-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.hq-response {
		margin: 1em;
		padding: 1em;
		border: 1px solid rgba(0, 0, 0, 0.35);
		text-align: center;
	}

	.hq-response .response {

	}

	.hq-response .count {
		font-size: 2em;
	}
</style>

<script>
import groupBy from 'lodash/groupBy';

export default {
	props: {
		highlight_name: {
			type: String,
			required: true
		},
		form_id: {
			type: Number,
			required: true
		},
		question_id: {
			type: String,
			required: true
		},
		responses: {
			type: Array,
			required: true
		}
	},
	computed: {
		responseMap() {
			return groupBy(this.responses, 'response');
		}
	}
};
</script>
