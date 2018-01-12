/* @flow */

import type { User } from '@/modules/utils.js';

export const USER_SETTINGS = {
	defaultEvaluationRange: [
		'currentQuarter',
		'currentSemester',
		'currentYear',
		'allTime'
	]
};

export const SETTINGS_HELP = {
	defaultEvaluationRange: 'Warning: selecting "All time" by default may result in longer loading times'
};

export function getUserSetting(user: User, settingName: string): ?string {
	if (user && user.user_settings) {
		const setting = user.user_settings.find(s => s.name === settingName);
		if (setting)
			return setting.value;
	}
}
