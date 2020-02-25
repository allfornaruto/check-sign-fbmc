const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/main.ts',
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
    extensions: ['.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    library: 'check-sign-fbmc',
    libraryTarget: 'commonjs2'
  }
};