const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

	target: 'node',

	entry: './server/app.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'be'),
	},

	module: {
		rules: [
			{
				test: /\.(png|jpe?g|svg)$/i,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			IMAGE_URL: JSON.stringify('https://dc49tfy8ac9y2.cloudfront.net'),
		}),
	],

	externals: [nodeExternals()],
};
