/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { describe, it, after } from 'mocha';

import { HTMLPreviewConfiguration } from '../features/previewConfig';

// HTMLPreviewConfiguration.getForResource reads live vscode.workspace.getConfiguration, so
// testing the "configs differ" path means actually changing config and reverting it
// afterward. Safe here: @vscode/test-electron runs an isolated, throwaway profile, not the
// developer's real VS Code settings.
describe('HTMLPreviewConfiguration.isEqualTo', function () {
	// Real config writes go through VS Code's settings-service I/O and can comfortably
	// exceed mocha's default 2000ms, especially the first write in a session.
	this.timeout(10000);

	const resource = vscode.Uri.file('/fake/config-test.html');
	const htmlConfig = vscode.workspace.getConfiguration('html');

	after(async () => {
		await htmlConfig.update('preview.scrollPreviewWithEditor', undefined, vscode.ConfigurationTarget.Global);
		await htmlConfig.update('styles', undefined, vscode.ConfigurationTarget.Global);
	});

	it('is true for two independently-constructed configs under identical settings', () => {
		const a = HTMLPreviewConfiguration.getForResource(resource);
		const b = HTMLPreviewConfiguration.getForResource(resource);
		assert.notStrictEqual(a, b, 'sanity check: these must be distinct instances, not the same object');
		assert.strictEqual(a.isEqualTo(b), true);
	});

	it('is false when a plain setting changes', async () => {
		const before = HTMLPreviewConfiguration.getForResource(resource);
		await htmlConfig.update('preview.scrollPreviewWithEditor', false, vscode.ConfigurationTarget.Global);
		const after_ = HTMLPreviewConfiguration.getForResource(resource);

		assert.strictEqual(before.isEqualTo(after_), false);
		assert.strictEqual(after_.isEqualTo(before), false, 'should be symmetric');

		await htmlConfig.update('preview.scrollPreviewWithEditor', undefined, vscode.ConfigurationTarget.Global);
	});

	it('is false when only the styles array changes', async () => {
		const before = HTMLPreviewConfiguration.getForResource(resource);
		await htmlConfig.update('styles', ['custom.css'], vscode.ConfigurationTarget.Global);
		const after_ = HTMLPreviewConfiguration.getForResource(resource);

		assert.strictEqual(before.isEqualTo(after_), false);

		await htmlConfig.update('styles', undefined, vscode.ConfigurationTarget.Global);
	});
});
