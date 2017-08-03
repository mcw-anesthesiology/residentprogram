<template>
	<div>
		{{ full_name }}
	</div>
</template>

<script>
export default {
	props: {
		full_name: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	}
};
</script>
