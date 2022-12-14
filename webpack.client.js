const path = require('path');
const webpack = require('webpack');

const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

	entry: process.env.NODE_ENV === 'production' ? ['./src/index.js'] : [hotMiddlewareScript, './src/index.js'],

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devtool: 'eval',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
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
			BUILD_FILE:
				process.env.NODE_ENV === 'production'
					? JSON.stringify('https://dc49tfy8ac9y2.cloudfront.net/build/bundle.js.gz')
					: JSON.stringify('bundle.js'),
			FIREBASE_KEY: JSON.stringify('AIzaSyDKw8WQDbG-Rc1gR3_wAyt72ZxCIcsYuls'),
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
