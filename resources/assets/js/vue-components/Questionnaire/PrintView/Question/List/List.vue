<template>
	<div class="print-view-question-list">
		<p class="list-text">{{ text }}</p>
		<component :is="listElement">
			<li v-for="(item, index) of items" :key="index"
					class="print-view-list-item">
				<dl>
					<template v-for="prop of Object.keys(item).filter(p => !['type', 'labels'].includes(p))">

						<dt :key="`dt-${prop}`">{{ ucfirst(camelCaseToWords(prop)) }}</dt>
						<dd :key="`dd-${prop}`">{{ item[prop] }}</dd>
					</template>
				</dl>
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
	}

	@media (min-width: 768px) {
		.print-view-question-list {
			padding-left: 5em;
		}
	}

	.list-text {
		font-weight: bold;
		margin: 0;
	}

	.print-view-list-item {
		page-break-inside: avoid;
	}

	.print-view-question-list > :global(ul),
	.print-view-question-list > :global(ol),
	dl {
		margin: 0;
	}

	dt, dd {
		display: inline-block;
	}

	dd:not(:last-child)::after {
		content: ',';
		display: inline-block;
		margin-right: 1em;
	}
</style>

<style>
</style>
