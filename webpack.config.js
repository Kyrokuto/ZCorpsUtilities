// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const path = require('path')
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/app.ts',
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, './dist'),
    filename: 'app-bundle.js', // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
}

