/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { describe, it } from 'mocha';

const EXTENSION_ID = 'SebastianOehm.html-preview-vscode-2';

const EXPECTED_COMMANDS = [
	'html.showPreview',
	'html.showPreviewToSide',
	'html.showLockedPreviewToSide',
	'html.showSource',
	'html.showPreviewSecuritySelector',
	'html.preview.refresh',
	'html.preview.toggleLock'
];

describe('Extension activation', () => {
	it('activates without throwing', async () => {
		const extension = vscode.extensions.getExtension(EXTENSION_ID);
		assert.ok(extension, `Extension ${EXTENSION_ID} was not found`);
		await extension!.activate();
		assert.strictEqual(extension!.isActive, true);
	});

	it('registers every command declared in package.json', async () => {
		const extension = vscode.extensions.getExtension(EXTENSION_ID)!;
		await extension.activate();
		const registeredCommands = await vscode.commands.getCommands(true);
		for (const command of EXPECTED_COMMANDS) {
			assert.ok(registeredCommands.includes(command), `Command "${command}" was not registered`);
		}
	});
});
