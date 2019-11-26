// const merge = require("webpack-merge");
// const commonConfig = require("./webpack.common");
const prodConfig = {
  mode: "production",
  // 打包后可以定位到源代码的错误
  devtool: "cheap-module-source-map",
}
// module.exports = merge(commonConfig, prodConfig);
module.exports =  prodConfig;