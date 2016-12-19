<template>
	<slot v-for="item of items" v-bind="item"></slot>
</template>

<script>
export default {
	props: {
		fields: Array,
		items: Array
	}
};
</script>
