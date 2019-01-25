<template>
	<li class="component-list-item user-list-item" @click="handleClick">
		{{ user.full_name }}
	</li>
</template>

<style scoped>
	.user-list-item {
		cursor: pointer;
	}
</style>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	methods: {
		handleClick(event) {
			if (event.defaultPrevented)
				return;

			this.$router.push({ path: this.user.id, hash: null });
		}
	}
};
</script>
