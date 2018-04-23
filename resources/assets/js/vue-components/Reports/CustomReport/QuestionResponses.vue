<template>
	<table class="question-responses table table-bordered">
		<thead>
			<tr>
				<th>Subject</th>
				<th>Evaluation #</th>
				<th class="response-col">Response</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(subjectResponses, subjectId) of responses">
				<tr>
					<th :rowspan="subjectResponses.length">
						{{ subjects.find(s => s.id == subjectId).full_name }}
					</th>
					<td>
						<a :href="`/evaluation/${subjectResponses[0].evaluation_id}`"
								target="_blank">
							{{ subjectResponses[0].evaluation_id }}
						</a>
					</td>
					<td class="response-col">{{ subjectResponses[0].response }}</td>
				</tr>
				<tr v-for="subjectResponse of subjectResponses.slice(1)">
					<td>
						<a :href="`/evaluation/${subjectResponse.evaluation_id}`"
								target="_blank">
							{{ subjectResponse.evaluation_id }}
						</a>
					</td>
					<td class="response-col">{{ subjectResponse.response }}</td>
				</tr>
			</template>
		</tbody>
	</table>
</template>

<style scoped>
	th, td {
		width: 20%;
	}

	.response-col {
		width: 60%;
	}
</style>

<script>
export default {
	props: {
		responses: {
			type: Object,
			required: true
		},
		subjects: {
			type: Array,
			required: true
		}
	}
};
</script>
