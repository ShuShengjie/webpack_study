const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  // mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: 'async.js'
  },
  // 打包后可以定位到源代码的错误
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // name是打包前模块的名称，ext是格式
            // name: "[path][name]_[hash].[ext]",
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 2048
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        // loader是有顺序的从后往前
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   // presets: [['@babel/preset-env', {
          //   //   // 按需加载 实验性功能 
          //   //   useBuiltIns: 'usage',
          //   //   corejs: 2
          //   // }]],
          //   // profill会造成全局污染
          //   // @babel/plugin-transform-runtime的缺点是无法将原型链上的方法编译
          //   plugins: [
          //     ['@babel/plugin-transform-runtime',
          //       // {
          //       //   absoluteRuntime: false,
          //       //   corejs: 2,
          //       //   helpers: true,
          //       //   regenerator: true,
          //       //   useESModules: false
          //       // }
          //     ]
          //   ]
          // }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"./index.html",
      title: 'study webpack',
      // filename: "app.html"
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // })
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
  // tree-sharking 打包时去掉不需要的代码 package.json里额外也需要设置"sideEffects": false,, 还需要修改devtool
  optimization: {
    usedExports: true
  }
}