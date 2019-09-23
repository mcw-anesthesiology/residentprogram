<template>
	<div class="print-view-question-list">
		<p class="list-text">{{ text }}</p>
		<span class="list-count">{{ items.length }}</span>
		<component :is="listElement">
			<li v-for="(item, index) of items" :key="index"
					class="print-view-list-item">
				<div class="item-contents">
					<div class="item-prop-container"
							v-for="prop of Object.keys(item).filter(p => !['type', 'labels'].includes(p))"
							:key="prop">
						<span class="prop">{{ ucfirst(camelCaseToWords(prop)) }}</span>
						<span class="value">{{ item[prop] }}</span>
					</div>
				</div>
			</li>
		</component>
	</div>
</template>

<script>
import { ucfirst, camelCaseToWords } from '@/modules/utils.js';

export default {
	props: {
		text: {
			type: String,
			required: false
		},
		ordered: {
			type: Boolean,
			default: false
		},
		items: {
			type: Array,
			required: true
		}
	},
	computed: {
		listElement() {
			return this.ordered ? 'ol' : 'ul';
		}
	},
	methods: {
		ucfirst,
		camelCaseToWords
	}
};
</script>

<style scoped>
	.print-view-question-list {
		padding-left: 1em;
		position: relative;
	}

	.list-text {
		font-weight: bold;
		margin: 0;
	}

	.list-count {
		font-size: 1.5em;
		position: absolute;
		left: -1em;
		top: 0;
		opacity: 0.85;
	}

	.print-view-list-item {
		page-break-inside: avoid;
	}

	.print-view-list-item ~ .print-view-list-item {
		margin-top: 0.25em;
	}

	.item-contents {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.item-prop-container {
		margin: 0.2em 0.5em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.item-prop-container > * {
		margin: 0 0.25em;
	}

	.item-prop-container .prop {
		font-weight: bold;
	}

	.item-prop-container .prop::after {
		content: ':';
	}

	.print-view-question-list >>> ul,
	.print-view-question-list >>> ol,
	dl {
		margin: 0;
		padding: 0;
	}
</style>

<style>
</style>
