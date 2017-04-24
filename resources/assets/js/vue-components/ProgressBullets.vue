<template>
	<div class="progress-bullets"
			role="progressbar" :aria-valuemin="min" :aria-valuemax="max"
			:aria-valuenow="value" :title="label">
		<div v-for="i in max" class="bullet" :class="{filled: i <= value}">
			
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'bar'
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		stepName: {
			type: String,
			default: 'Page'
		}
	},
	
	computed: {
		label() {
			return `${this.stepName} ${this.value} of ${this.max}`;
		}
	}
};
</script>

<style scoped>
	.progress-bullets {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	
	.bullet {
		margin: 1em;
		width: 0.5em;
		height: 0.5em;
		border-radius: 0.5em;
		background-color: rgba(0, 0, 0, 0.35);
	}
	
	.bullet.filled {
		background-color: rgba(0, 0, 0, 0.75);
	}
</style>
