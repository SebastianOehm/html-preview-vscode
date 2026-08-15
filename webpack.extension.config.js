/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = require('path');

module.exports = {
	mode: 'production',
	target: 'node',
	entry: './src/extension.ts',
	externals: {
		// Provided by the VS Code extension host at runtime, never bundled.
		vscode: 'commonjs vscode'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	devtool: 'source-map',
	output: {
		filename: 'extension.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs2'
	}
};
