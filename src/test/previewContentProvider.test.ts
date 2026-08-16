/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { describe, it, after } from 'mocha';

import { HTMLContentProvider } from '../features/previewContentProvider';
import { HTMLPreviewConfigurationManager } from '../features/previewConfig';
import { ExtensionContentSecurityPolicyArbiter } from '../security';
import { Logger } from '../logger';
import { InMemoryDocument } from './inMemoryDocument';
import { makeMemento } from './testUtils';

describe('HTMLContentProvider.provideTextDocumentContent', () => {
	const panel = vscode.window.createWebviewPanel('test.preview', 'Test Preview', vscode.ViewColumn.Active);
	after(() => panel.dispose());

	const contentProvider = new HTMLContentProvider(
		{ asAbsolutePath: (relativePath: string) => relativePath } as vscode.ExtensionContext,
		new ExtensionContentSecurityPolicyArbiter(makeMemento(), makeMemento()),
		new Logger()
	);

	const document = new InMemoryDocument(
		vscode.Uri.file('/fake/workspace/test.html'),
		['<p>zero</p>', '<p>one</p>', '<img src="test.png">'].join('\n')
	);

	const output = contentProvider.provideTextDocumentContent(
		document,
		panel.webview,
		new HTMLPreviewConfigurationManager()
	);

	it('tags each line with a 0-indexed data-line attribute', () => {
		// Regression guard: data-line must line up with VS Code's 0-indexed Position/Range
		// API, not the array index + 1 it was generated as before. See the "off-by-one in
		// scroll-sync, click-to-jump, and active-line marking" fix.
		assert.ok(output.includes('data-line="0"'), 'expected data-line="0" on the first line');
		assert.ok(output.includes('data-line="1"'), 'expected data-line="1" on the second line');
		assert.ok(output.includes('data-line="2"'), 'expected data-line="2" on the third line');
		assert.ok(!output.includes('data-line="3"'), 'document only has 3 lines');
	});

	it('rewrites the base href through the real webview.asWebviewUri, not the legacy scheme', () => {
		const expectedBaseHref = panel.webview.asWebviewUri(document.uri).toString(true);
		assert.ok(output.includes(`<base href="${expectedBaseHref}">`));
		assert.ok(!output.includes('vscode-resource:'), 'the legacy vscode-resource: scheme should never appear');
	});

	it('builds the CSP meta tag from webview.cspSource', () => {
		assert.ok(output.includes('Content-Security-Policy'));
		assert.ok(output.includes(panel.webview.cspSource));
	});

	it('includes the preview script tags', () => {
		assert.ok(output.includes('pre.js'));
		assert.ok(output.includes('index.js'));
	});
});
