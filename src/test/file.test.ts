/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { describe, it } from 'mocha';

import { isHTMLFile } from '../util/file';
import { InMemoryDocument } from './inMemoryDocument';

describe('isHTMLFile', () => {
	it('returns true for a document with languageId "html"', () => {
		const document = new InMemoryDocument(vscode.Uri.file('/fake/test.html'), '');
		document.languageId = 'html';
		assert.strictEqual(isHTMLFile(document), true);
	});

	it('returns false for a document with any other languageId', () => {
		const document = new InMemoryDocument(vscode.Uri.file('/fake/test.md'), '');
		document.languageId = 'markdown';
		assert.strictEqual(isHTMLFile(document), false);
	});
});
