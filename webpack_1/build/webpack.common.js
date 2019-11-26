const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const commonConfig = {
  entry: {
    // lodash: './lodash.js',
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: '[name].js'
  },
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
  ],
}

module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
}