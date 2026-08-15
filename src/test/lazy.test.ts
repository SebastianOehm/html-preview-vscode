/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { lazy } from '../util/lazy';

describe('lazy', () => {
	it('does not call getValue until value is read', () => {
		let calls = 0;
		const value = lazy(() => { calls++; return 42; });
		assert.strictEqual(calls, 0);
		assert.strictEqual(value.hasValue, false);

		void value.value;
		assert.strictEqual(calls, 1);
		assert.strictEqual(value.hasValue, true);
	});

	it('computes getValue only once, even when read repeatedly', () => {
		let calls = 0;
		const value = lazy(() => { calls++; return calls; });

		assert.strictEqual(value.value, 1);
		assert.strictEqual(value.value, 1);
		assert.strictEqual(value.value, 1);
		assert.strictEqual(calls, 1);
	});

	it('map() composes lazily without forcing the source', () => {
		let sourceCalls = 0;
		let mapCalls = 0;
		const source = lazy(() => { sourceCalls++; return 10; });
		const mapped = source.map(x => { mapCalls++; return x * 2; });

		assert.strictEqual(sourceCalls, 0, 'source should not be forced by map() itself');
		assert.strictEqual(mapCalls, 0);

		assert.strictEqual(mapped.value, 20);
		assert.strictEqual(sourceCalls, 1);
		assert.strictEqual(mapCalls, 1);
	});
});
