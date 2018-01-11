/* @flow */

import type { User } from '@/modules/utils.js';

export function getUserSetting(user: User, settingName: string): ?string {
	if (user && user.user_settings) {
		const setting = user.user_settings.find(s => s.name === settingName);
		if (setting)
			return setting.value;
	}
}
