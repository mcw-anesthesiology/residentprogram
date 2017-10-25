<template>
	<div class="row">
		<div class="col-sm-2">
			{{ scholarlyActivity[0] }}
		</div>
		<div class="col-sm-4">
			<small>PubMed IDs (up to 4)</small>
			<span>{{ scholarlyActivity[1] }}</span>
			<span>{{ scholarlyActivity[2] }}</span>
			<span>{{ scholarlyActivity[3] }}</span>
			<span>{{ scholarlyActivity[4] }}</span>
		</div>
		<div class="col-sm-2">
			<small>Conference presentations (#)</small>
			{{ scholarlyActivity[5] }}
		</div>
		<div class="col-sm-2">
			<small>Other presentations (#)</small>
			{{ scholarlyActivity[6] }}
		</div>
		<div class="col-sm-2">
			<small>Chapters / textbooks (#)</small>
			{{ scholarlyActivity[7] }}
		</div>
		<div class="col-sm-2">
			<small>Grant leadership (#)</small>
			{{ scholarlyActivity[8] }}
		</div>
		<div class="col-sm-2">
			<small>Leadership or peer-review role (Y/N)</small>
			{{ scholarlyActivity[9] }}
		</div>
		<div class="col-sm-2">
			<small>Teaching formal courses (Y/N)</small>
			{{ scholarlyActivity[10] }}
		</div>
	</div>
</template>

<script>
import { getScholarlyActivity } from '@/modules/merits/faculty-merit/index.js';

export default {
	props: {
		full_name: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	computed: {
		scholarlyActivity() {
			return getScholarlyActivity(this.report, this.full_name);
		}
	}
};
</script>
