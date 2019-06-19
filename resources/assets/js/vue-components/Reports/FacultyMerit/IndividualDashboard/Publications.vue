<template>
	<section class="publications-list">
		<h3>Publications</h3>
		<p v-if="publications.length === 0">No publications listed.</p>
		<div
			v-else
			v-for="(publications, publicationType) of publicationsByType"
			:key="publicationType"
		>
			<h4>{{ publicationType }}</h4>
			<ol>
				<li
					v-for="publication of publications"
					:key="publication.title"
				>
					{{ publication.title }}
				</li>
			</ol>
		</div>
	</section>
</template>

<script>
/** @format */

import groupBy from 'lodash/groupBy';

export default {
	props: {
		publications: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		}
	},
	computed: {
		publicationsByType() {
			return groupBy(this.publications, 'publicationType');
		}
	}
};
</script>
