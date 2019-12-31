const path = require('path');
// css提取到单个文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// html引用外部资源，防止缓存
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  // JavaScript 执行入口文件
  entry: './app/main.js',
  /*
  entry: {
    pageA: "./app/pageA.js",
    pageB: "./app/pageB.js"
  },*/
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    //filename: 'bundle.js',
    filename: "[name].bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
    // 配合代码分离
    chunkFilename: "[name].chunk.js"
  },
  devtool: 'source-map',
  devServer: {
    host: '127.0.0.1',
    port: '8400',
    hot: true,
    inline: true
    //contentBase: './app'
  },
  module: {
    rules: [
      {
        // 使用正则表达式匹配用该loader转换的文件
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 1000,  // size <= 1kb 进行base64编码
              publicPath: "static/images",
              outputPath: "static/images",
            }
          },
          {
            // img zip
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-pngquant")({
                  quality: [0.6, 0.8]
                })
              ]
            }
          }
        ]
      }
    ]
  },
  /*optimization: {
    splitChunks: {
      cacheGroups: {
        // 多页面公用代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // node_modules(第三方插件)
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  },*/
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "[name].[chunkhash:8].css",
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'app/index.html'
    })
  ]
};