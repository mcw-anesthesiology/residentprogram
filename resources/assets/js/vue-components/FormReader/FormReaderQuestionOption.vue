<template>
	<div class="question-option">
		<label>
			<span :title="description">
				<input v-if="questionType === 'checkbox'" type="checkbox"
					:name="`${questionId}[]`" :value="value"
					:required="required" :disabled="disabled" />
				<input v-else type="radio" :name="questionId" :value="value"
					:required="required" :disabled="disabled" />
				<br />
				{{ text }}
			</span>
		</label>
		<div v-if="description" v-show="showDescription" class="description well"
			v-html="md.render(description)">
		</div>
		<slot></slot>
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
		disabled: Boolean,

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
