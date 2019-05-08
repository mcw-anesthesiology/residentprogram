<template>
	<li class="goals-item">
		<h3>
			{{ heading }}
		</h3>
		<ol>
			<li v-for="i of Array(items).fill()" :key="i">
				<div v-for="j of Array(lines).fill()" :key="j" class="line"></div>
			</li>
		</ol>
	</li>
</template>

<style scoped>
.goals-item {
	font-size: 1.25em;
}

h3 {
	font-size: 1em;
}

ol {
	font-size: 0.75em;
	padding-left: 1em;
}

ol li {
	padding-top: 1em;
	padding-left: 0.5em;
}

ol li + li {
	margin-top: 1em;
}

.line {
	width: 100%;
	border-bottom: 1px solid #333;
}

.line + .line {
	margin-top: 2em;
}
</style>

<script>
export default {
	props: {
		heading: {
			type: String,
			required: true
		},
		items: {
			type: Number,
			default: 2
		},
		lines: {
			type: Number,
			default: 1
		}
	}
};
</script>
