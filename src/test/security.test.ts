/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { describe, it } from 'mocha';

import { ExtensionContentSecurityPolicyArbiter, HTMLPreviewSecurityLevel } from '../security';
import { makeMemento } from './testUtils';

function makeArbiter(): ExtensionContentSecurityPolicyArbiter {
	return new ExtensionContentSecurityPolicyArbiter(makeMemento(), makeMemento());
}

describe('ExtensionContentSecurityPolicyArbiter', () => {
	it('defaults an unconfigured resource to the Strict security level', () => {
		const arbiter = makeArbiter();
		const resource = vscode.Uri.file('/fake/a.html');
		assert.strictEqual(arbiter.getSecurityLevelForResource(resource), HTMLPreviewSecurityLevel.Strict);
	});

	it('round-trips a security level set for a resource', async () => {
		const arbiter = makeArbiter();
		const resource = vscode.Uri.file('/fake/b.html');
		await arbiter.setSecurityLevelForResource(resource, HTMLPreviewSecurityLevel.AllowScriptsAndAllContent);
		assert.strictEqual(arbiter.getSecurityLevelForResource(resource), HTMLPreviewSecurityLevel.AllowScriptsAndAllContent);
	});

	it('keeps security levels independent per resource', async () => {
		const arbiter = makeArbiter();
		const a = vscode.Uri.file('/fake/independent-a.html');
		const b = vscode.Uri.file('/fake/independent-b.html');
		await arbiter.setSecurityLevelForResource(a, HTMLPreviewSecurityLevel.AllowInsecureContent);
		assert.strictEqual(arbiter.getSecurityLevelForResource(a), HTMLPreviewSecurityLevel.AllowInsecureContent);
		assert.strictEqual(arbiter.getSecurityLevelForResource(b), HTMLPreviewSecurityLevel.Strict);
	});

	it('only allows SVGs for the two insecure-content levels', async () => {
		const arbiter = makeArbiter();
		const resource = vscode.Uri.file('/fake/svg.html');

		await arbiter.setSecurityLevelForResource(resource, HTMLPreviewSecurityLevel.Strict);
		assert.strictEqual(arbiter.shouldAllowSvgsForResource(resource), false);

		await arbiter.setSecurityLevelForResource(resource, HTMLPreviewSecurityLevel.AllowInsecureLocalContent);
		assert.strictEqual(arbiter.shouldAllowSvgsForResource(resource), false);

		await arbiter.setSecurityLevelForResource(resource, HTMLPreviewSecurityLevel.AllowInsecureContent);
		assert.strictEqual(arbiter.shouldAllowSvgsForResource(resource), true);

		await arbiter.setSecurityLevelForResource(resource, HTMLPreviewSecurityLevel.AllowScriptsAndAllContent);
		assert.strictEqual(arbiter.shouldAllowSvgsForResource(resource), true);
	});

	it('defaults security warnings to shown, and round-trips disabling them', async () => {
		const arbiter = makeArbiter();
		assert.strictEqual(arbiter.shouldDisableSecurityWarnings(), false);

		await arbiter.setShouldDisableSecurityWarning(true);
		assert.strictEqual(arbiter.shouldDisableSecurityWarnings(), true);
	});
});
