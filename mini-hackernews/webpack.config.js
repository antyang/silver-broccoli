var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./babelRelayPlugin']}
        // tells babel to find this file
      }
    ]
  },
  output: {filename: 'index.bundle.js', path: './'}
};
