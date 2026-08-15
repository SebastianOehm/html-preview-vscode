/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { describe, it } from 'mocha';

function makeCodeLineElement(dataLine: number) {
	return {
		getAttribute: (name: string) => name === 'data-line' ? String(dataLine) : null
	};
}

// getElementsForSourceLine reads document.getElementsByClassName('code-line') once and
// memoizes the result at module scope, so the fake document has to be in place before
// scroll-sync is first imported below.
(global as any).document = {
	getElementsByClassName: (className: string) =>
		className === 'code-line'
			? [makeCodeLineElement(2), makeCodeLineElement(5), makeCodeLineElement(9)]
			: []
};

import { getElementsForSourceLine } from './scroll-sync';

// These tests cover the consumer side: given correctly 0-indexed data-line values, does the
// line-matching logic pick the right element(s)? They don't cover whether data-line itself is
// generated correctly (that lives in previewContentProvider.ts on the extension-host side,
// where the 1-indexed-vs-0-indexed bug actually was).
describe('getElementsForSourceLine', () => {
	it('returns an exact match with no next element', () => {
		const { previous, next } = getElementsForSourceLine(5);
		assert.strictEqual(previous.line, 5);
		assert.strictEqual(next, undefined);
	});

	it('returns the surrounding elements when the target line falls between two entries', () => {
		const { previous, next } = getElementsForSourceLine(3);
		assert.strictEqual(previous.line, 2);
		assert.strictEqual(next?.line, 5);
	});

	it('returns the last element with no next when the target line is past the end', () => {
		const { previous, next } = getElementsForSourceLine(99);
		assert.strictEqual(previous.line, 9);
		assert.strictEqual(next, undefined);
	});

	it('floors fractional target lines before matching', () => {
		const { previous, next } = getElementsForSourceLine(5.9);
		assert.strictEqual(previous.line, 5);
		assert.strictEqual(next, undefined);
	});
});
