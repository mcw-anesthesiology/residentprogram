/* @flow */
/* global process */

import Rollbar from 'rollbar';

import { ROLLBAR_TOKEN } from '@/modules/constants.js';
import { simpleErrorAlert } from '@/modules/utils.js';

import type { BootstrapAlertItem } from '@/modules/utils.js';

type ViewModel = {
	$emit: Function
};

type AlertContainer = {
	alerts: Array<BootstrapAlertItem>
};

export const rollbar = new Rollbar({
	enabled: process.env.NODE_ENV === 'production',
	accessToken: ROLLBAR_TOKEN,
	captureUncaught: true,
	captureUnhandledRejections: false,
	payload: {
		environment: process.env.NODE_ENV,
		person: window.RESIDENTPROGRAM_USER
	}
});

export function logError(...errs: Array<Error | string>) {
	console.error(...errs);
	rollbar.error(...errs);
}

export function handleError(err: Error, vm: ?AlertContainer, message: ?string) {
	logError(err);
	if (vm && message && vm.alerts && Array.isArray(vm.alerts)) {
		vm.alerts.push(simpleErrorAlert(message));
	}
}

export function emitError(err: Error, vm: ViewModel, message: string, event: string = 'alert') {
	logError(err);
	vm.$emit(event, simpleErrorAlert(message));
}

export function storeError(err: Error, vm: ViewModel, message: string) {
	logError(message, err);
	vm.$store.dispatch('error', message);
}
