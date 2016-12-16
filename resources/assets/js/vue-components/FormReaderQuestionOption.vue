<template>
	<div class="question-option">
		<label>
			<span :title="description">
				<input v-if="questionType === 'checkbox'" type="checkbox"
					:name="`${questionId}[]`" :value="value"
					:required="required" />
				<input v-else type="radio" :name="questionId" :value="value"
					:required="required" />
				<br />
				{{ text }}
			</span>
		</label>
		<slot></slot>
		<div v-if="description && showDescription" class="description well"
			v-html="md.render(description)">
		</div>
	</div>
</template>

<script>
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default {
	props: {
		value: {
			required: true
		},
		text: String,
		description: String,

		questionType: String,
		questionId: String,
		required: Boolean,

		showDescription: Boolean
	},
	computed: {
		md(){
			return md;
		}
	}
}
</script>
