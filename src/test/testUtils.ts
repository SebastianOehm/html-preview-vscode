/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';

export function makeMemento(): vscode.Memento {
	const store = new Map<string, unknown>();
	return {
		keys: () => [...store.keys()],
		get: (key: string, defaultValue?: unknown) => store.has(key) ? store.get(key) : defaultValue,
		update: (key: string, value: unknown) => {
			store.set(key, value);
			return Promise.resolve();
		}
	} as vscode.Memento;
}
