import Vue from '@/vue-constructors/index.js';

import EditorV2 from './Editor.vue';
import EditorV1 from './V1/Editor.vue';

import ViewerV2 from './Viewer.vue';
import ViewerV1 from './V1/Details.vue';

import { logError } from '@/modules/errors.js';

export function getVersion(caseLog) {
	try {
		return Number(caseLog.details_schema.case_log_version);
	} catch (err) {
		logError(err);
	}

	return 1;
}

export const EditorById = {
	functional: true,
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},
	render(h, context) {
		const caseLog = context.props.caseLogs.find(cl => cl.id == context.parent.$route.params.id);
		if (!caseLog)
			return null;

		const data = { ...context.data };
		data.attrs.caseLog = caseLog;

		return h(
			Editor(caseLog),
			data,
			context.children
		);
	}
};

export const ViewerById = {
	functional: true,
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},
	render(h, context) {
		const caseLog = context.props.caseLogs.find(cl => cl.id == context.parent.$route.params.id);
		if (!caseLog)
			return null;

		const data = { ...context.data };
		data.attrs.caseLog = caseLog;

		return h('div', { attrs: { class: 'container body-block' }}, [
			h(
				Viewer(caseLog),
				data,
				context.children
			)
		]);
	}
};

export function Editor(caseLog) {
	switch (getVersion(caseLog)) {
		case 2:
			return EditorV2;
		case 1:
		default:
			return EditorV1;
	}
}

export function Viewer(caseLog) {
	switch (getVersion(caseLog)) {
		case 2:
			return ViewerV2;
		case 1:
		default:
			return ViewerV1;
	}
}
