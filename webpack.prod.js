// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const { merge } = require('webpack-merge')
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const common = require('./webpack.common.js')
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const TerserPlugin = require('terser-webpack-plugin')

// eslint-disable-next-line no-undef
module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})

