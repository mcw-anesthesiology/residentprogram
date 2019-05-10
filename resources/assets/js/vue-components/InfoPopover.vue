<template>
	<v-popover popover-base-class="info-popover" popover-inner-class="info-popover-inner">
		<button type="button" class="close">
			<span class="glyphicon glyphicon-question-sign"></span>
		</button>
		<popover-container slot="popover">
			<slot></slot>
		</popover-container>
	</v-popover>
</template>

<style scoped>
.v-popover {
	display: inline-block;
}

button.close {
	font-size: 1em;
}

@media print {
	.v-popover {
		display: none;
	}
}
</style>

<script>
import PopoverContainer from './PopoverContainer.vue';

export default {
	components: {
		PopoverContainer
	}
};
</script>
