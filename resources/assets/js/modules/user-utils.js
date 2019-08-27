/* @flow */

import { ucfirst } from './utils.js';

import type { User } from '@/modules/utils.js';

export type SpecificType = string; // TODO: make into a legit enum

export const USER_SETTINGS = {
	defaultEvaluationRange: [
		'currentQuarter',
		'currentSemester',
		'currentYear',
		'allTime'
	],
	preferHashLinks: [
		'yes',
		'no'
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

export function getSpecificType(user: User): SpecificType {
	if (user.type === 'resident' && user.training_level === 'fellow')
		return 'fellow';

	return user.type;
}

export function renderUserType(type: string): string {
	type = type.toLowerCase();
	switch (type) {
		case 'app':
			return 'APP';
		default:
			return ucfirst(type);
	}
}
