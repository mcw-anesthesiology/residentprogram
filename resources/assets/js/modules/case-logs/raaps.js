/* @flow */

import { logError } from '@/modules/errors.js';
import { getValues } from '@/modules/questionnaire/index.js';

import type { QuestionCountSummary } from '@/modules/chart-utils.js';
import type { QuestionnaireQuestion } from '@/modules/questionnaire/index.js';


const PERIPHERAL_CATEGORY_KEY = 'PERIPHERAL-CATEGORY';

export const ADDITIONAL_SUMMARY_NAMES: Map<string, string> = new Map([
	[PERIPHERAL_CATEGORY_KEY, 'Peripheral blockade site category']
]);

export function getAdditionalSummaryMaps(
	idMaps: Array<Map<string, QuestionnaireQuestion>>
): Map<string, QuestionCountSummary> {
	const map = new Map();


	try {
		const peripheralCategoryMap = new Map();

		for (const idMap of idMaps) {
			for (const question of idMap.values()) {
				if (question.id === 'peripheral-blockade-site') {
					try {
						const categories = getValues(question)
							.map(value => getPeripheralCategory(value));
						for (const category of categories) {
							const count = peripheralCategoryMap.has(category)
								? peripheralCategoryMap.get(category)
								: 0;

							peripheralCategoryMap.set(category, count + 1);
						}
					} catch (e) {
						logError(e);
					}
				}
			}
		}

		map.set(PERIPHERAL_CATEGORY_KEY, peripheralCategoryMap);
	} catch (e) {
		logError(`Unable to compute ${PERIPHERAL_CATEGORY_KEY}`, e);
	}

	return map;
}

// Based on details given to me by Dr Anderson
export function getPeripheralCategory(peripheralBlockadeSite: string | number): string {
	if ([
		'axillary',
		'infraclavicular',
		'supraclavicular',
		'interscalene'
	].includes(peripheralBlockadeSite))
		return 'Upper';

	if ([
		'ankle',
		'femoral',
		'sciatic',
		'popliteal',
		'saphenous'
	].includes(peripheralBlockadeSite))
		return 'Lower';

	if ([
		'lumbar-plexus',
		'pectoral-block',
		'rectus-sheath',
		'fascia-iliaca',
		'paravertebral',
		'quadratus-lumborum',
		'tap'
	].includes(peripheralBlockadeSite))
		return 'Trunkal';

	return 'Other';
}
