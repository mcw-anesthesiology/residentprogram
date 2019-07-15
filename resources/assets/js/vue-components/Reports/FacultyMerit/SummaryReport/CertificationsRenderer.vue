<template>
	<ul>
		<li v-for="certification of params">
			{{ certification.board }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		params: Array
	}
};
</script>
