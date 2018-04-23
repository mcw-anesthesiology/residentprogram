<template>
	<tr>
		<th>{{ subject.full_name }}</th>
	<template v-for="option of options">
		<td class="subject-table-cell">
			<span class="count">
				{{
					(option.responses && option.responses[subject.id])
					|| ''
				}}
			</span>
			<span class="percent">
				{{
					(
						option.responses && option.responses[subject.id]
						&& percent(option.responses[subject.id] / subjectTotal)
					)
					|| ''
				}}
			</span>
		</td>
	</template>
		<td class="total-cell">
			{{ subjectTotal || '' }}
		</td>
	</tr>
</template>

<script>
import { percent } from '@/modules/formatters.js';

export default {
	props: {
		subject: {
			type: Object,
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},
	computed: {
		subjectTotal() {
			return this.sum(this.getSubjectResponses(this.subject.id));
		}
	},
	methods: {
		percent,
		sum(arr) {
			if (!arr)
				return 0;

			return arr.reduce((total, option) => total + option, 0);
		},
		getSubjectResponses(subjectId) {
			if (!this.options)
				return;

			return this.options.map(o =>
				this.getSubjectResponse(o, subjectId)
			).filter(Boolean);
		},
		getSubjectResponse(option, subjectId) {
			if (!option.responses)
				return;

			return option.responses[subjectId];
		}
	}
};
</script>
