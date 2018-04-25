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
			<template v-for="subject of subjects">
				<tr>
					<th :rowspan="responses[subject.id].length">
						{{ subject.full_name }}
					</th>
					<td>
						<a :href="`/evaluation/${responses[subject.id][0].evaluation_id}`"
								target="_blank">
							{{ responses[subject.id][0].evaluation_id }}
						</a>
					</td>
					<td class="response-col">{{ responses[subject.id][0].response }}</td>
				</tr>
				<tr v-for="subjectResponse of responses[subject.id].slice(1)">
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
