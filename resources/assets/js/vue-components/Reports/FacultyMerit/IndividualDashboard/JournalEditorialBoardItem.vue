<template>
	<li class="journal-editorial-board-item">
		<span>
			{{ journal }}
		</span>

		<ul>
			<li v-for="{ period, role } of roles" :key="role">
				{{ role }}
				<span v-if="showPeriods"> ({{ period }}) </span>
			</li>
		</ul>
	</li>
</template>

<style scoped>
.journal-editorial-board-item > span {
	font-size: 1.1em;
}

ul {
	font-size: 0.9em;
}
</style>

<script>
/** @format */

export default {
	props: {
		journal: String,
		roles: Array,
		showPeriods: {
			type: Boolean,
			default: false
		}
	}
};
</script>
