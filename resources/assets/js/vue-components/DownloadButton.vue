<template>
	<button type="button" :disabled="processing" @click="handleClick">
		<slot v-if="processing" name="processing">
			Processing
		</slot>
		<slot v-else>
			Download
		</slot>
	</button>
</template>

<script>
import download from 'downloadjs';

import { emitError } from '@/modules/errors.js';
import { arrToCsv } from '@/modules/report-utils.js';

export default {
	props: {
		filename: {
			type: String,
			default: 'export.csv'
		},
		contentType: {
			type: String,
			default: 'text/csv'
		},
		dataGetter: {
			type: Function,
			required: true
		}
	},
	data() {
		return {
			processing: false
		};
	},
	methods: {
		handleClick() {
			if (!this.dataGetter)
				return;

			this.processing = true;

			return new Promise(resolve => {
				let data = this.dataGetter();

				console.log('data', data);

				if (this.contentType === 'text/csv' && typeof data !== 'string')
					data = arrToCsv(data);

				download(data, this.filename, this.contentType);
				resolve();
			}).catch(err => {
				emitError(err, this, 'There was a problem exporting your data');
			}).finally(() => {
				this.processing = false;
			});
		}
	}
};
</script>
