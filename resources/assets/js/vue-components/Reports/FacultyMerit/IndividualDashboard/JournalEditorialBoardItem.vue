<template>
	<li class="journal-editorial-board-item">
		<h4>
			{{ journal }}
		</h4>

		<ul>
			<li v-for="{ period, role } of roles" :key="role">
				{{ role }}
				<span v-if="showPeriods"> ({{ period }}) </span>
			</li>
		</ul>
	</li>
</template>

<style scoped>
.journal-editorial-board-item {
	list-style: none;
}

h4 {
	font-size: 1.25em;
}

ul {
	padding-left: 1em;
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
