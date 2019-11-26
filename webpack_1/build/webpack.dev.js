const webpack = require("webpack");
// const merge = require("webpack-merge");
// const commonConfig = require("./webpack.common");
const devConfig = {
  mode: "development",
  // 打包后可以定位到源代码的错误
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    // open: true,
    hot: true,
    hotOnly: true,
    port: "8888",
    proxy: {
      "/api": {
        target: "http://localhost:9999"
      }
    },
  },
  optimization: {
    // tree-sharking 打包时去掉不需要的代码 package.json里额外也需要设置"sideEffects": false,, 还需要修改devtool
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
    }
  }
}

// module.exports = merge(commonConfig, devConfig);
module.exports = devConfig;