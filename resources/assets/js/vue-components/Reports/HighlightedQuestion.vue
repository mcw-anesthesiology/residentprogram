<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<span class="panel-title">
				{{ highlightName }}
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
		responses: {
			type: Array,
			required: true
		}
	},
	computed: {
		highlightName() {
			if (this.responses && this.responses.length > 0)
				return this.responses[0].highlight_name;
		},

		responseMap() {
			return groupBy(this.responses, getResponseValue);
		}
	}
};

function getResponseValue(response) {
	if (response.highlighted_value)
		return response.highlighted_value;
	if (response.text_response)
		return response.text_response;
	if (response.response)
		return response.response;
}
</script>
