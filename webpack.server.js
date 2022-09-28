const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  target: 'node',

  entry: './app.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'be')
  },
  
  externals: [nodeExternals()],
}