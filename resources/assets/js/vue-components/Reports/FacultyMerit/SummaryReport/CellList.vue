<template>
	<td>
		<div v-if="exporting">
			<div v-for="item of items">
				<span>&bull;</span>
				<slot :item="item"></slot>
				<span>&#13;&#10;</span>
				<br/>
			</div>
		</div>
		<ul v-else>
			<li v-for="item of items">
				<slot :item="item"></slot>
			</li>
		</ul>
	</td>
</template>

<style scoped>
ul {
	padding-left: 1em;
}
</style>

<script>
export default {
	props: {
		exporting: {
			type: Boolean,
			default: false
		},
		items: {
			type: Array,
			required: true
		}
	}
};
</script>
