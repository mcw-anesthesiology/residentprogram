/* @flow */
/* global process */

import Rollbar from 'rollbar';

import { ROLLBAR_TOKEN } from '@/modules/constants.js';
import { simpleErrorAlert } from '@/modules/utils.js';

import type { BootstrapAlertItem } from '@/modules/utils.js';

type ViewModelWithAlerts = {
	alerts: Array<BootstrapAlertItem>
};

export const rollbar = new Rollbar({
	enabled: process.env.NODE_ENV === 'production',
	accessToken: ROLLBAR_TOKEN,
	captureUncaught: true,
	captureUnhandledRejections: false,
	payload: {
		environment: 'production'
	}
});

export function handleError(err: Error, vm: ?ViewModelWithAlerts, message: ?string) {
	console.error(err);
	rollbar.error(err);
	if (vm && message) {
		vm.alerts.push(simpleErrorAlert(message));
	}
}
