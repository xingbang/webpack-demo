[深入浅出 Webpack](http://webpack.wuhaolin.cn)

[link](https://xin-tan.com/passages/2018-07-29-webpack-demos-introduction/)

[文档](https://www.webpackjs.com/concepts/)

#### webpack 4

> npm i webpack webpack-cli -D

#### 处理css

> npm i css-loader style-loader -D

- scss

> npm i node-sass sass-loader -D

```js

// css提取到单个文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module: {
    rules: [
      {
        // 使用正则表达式匹配用该loader转换的文件
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "[name].[chunkhash:8].css",
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    })
  ]
```

#### 图片处理

- 处理图片

> npm i url-loader file-loader -D

- 压缩图片时(imagemin-pngquant是png的插件)

> npm i img-loader imagemin-pngquant imagemin -D

- 合成雪碧图

> npm i postcss-loader postcss-sprites -D

```JS
module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 2000,  // size <= 2kb 进行base64编码
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

```

#### 字体文件

- 借助url-loader，处理eot, woff等结尾的字体文件

```
{
    test: /\.(eot|woff2?|ttf|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          name: "[name]-[hash:5].min.[ext]",
          limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
          publicPath: "dist/static/fonts/",
          outputPath: "dist/static/fonts/"
        }
      }
    ]
}
```
#### 编译ES6

- babel-loder: 复制es6语法转化

> npm i -D babel-core babel-loder（babel-loader7）

> npm i -D @babel/core babel-loder（babel-loader8）

- babel-preset-env: 包含es67等版本的语法转换规则

> npm i -D babel-preset-env（babel-loader7）

> npm i -D @babel/preset-env（babel-loader8）

- babel-plugin-transform-runtime 和 babel-runtime 需要配套使用，可以减少编译后的代码大小

> npm i -D babel-plugin-transform-runtime babel-runtime（babel-loader7）

> npm i -D @babel/plugin-transform-runtime @babel/runtime（babel-loader8）

###### .babelrc

```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}

```

###### webpack.config.js
```js
module: {
    rules: [
        test: /\.js$/,
        use: ["babel-loader"]
    ]
}
```

#### 多页面提取公共代码

- webpack4提取公用代码部分用optimization.splitChunks替换了3.0版本CommonsChunkPlugin插件


```js
optimization: {
    splitChunks: {
      cacheGroups: {
        // 公用代码
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
  }

```

#### 自动生成HTML

- 借助HtmlWebpackPlugin插件生成index.html模版，并借助html-loader处理html文件中的img标签

> npm i html-webpack-plugin html-loader -D

```

// html引用外部资源，防止缓存
const HtmlWebpackPlugin = require('html-webpack-plugin')

module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      }
    ]
},

plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'app/index.html',
      minify: {
          // 压缩选项
          collapseWhitespace: true
      }
    })
  ]

```

