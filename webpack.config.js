

require('./postcss.config.js')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

require('html-minifier');

module.exports = {
  entry: {
    app:'./src/index.js',
    print:'./src/print.js'
  },
  output: {
    filename: '[name].bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{
    compress: true,
    contentBase:'/dist',
    proxy: {
      "/api/v1/topic?(s)?(/**)": { //
        target: "https://cnodejs.org",
        secure: false
      },
      // "/api/v1/topic/**": {
      //   target: "https://cnodejs.org",
      //   secure: false
      // }
    }
  },
  devtool: 'inline-source-map',
  plugins: [
  new ManifestPlugin({
    fileName: 'manifest1.json',
    basePath: '/manifest1/',
    publicPath:path.resolve(__dirname, '/'),
    seed: {
      name: '资源列表222'
    }
  }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title:'output html-webpack-plugin',
      filename:'index.html',
      template:'./index.ejs',
      // inject:'body',
      favicon:'./src/img/logo.png',
      minify:{
      collapseWhitespace:true,
      minifyJS:true,
      minifyCSS:true
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles-[hash].css'
    }),
  ],
  module: {
    rules: [
      // {
      //     test:/\.css$/,
      //     use: ExtractTextPlugin.extract({
      //       fallback: "style-loader",
      //       use: "css-loader"
      //     })
      // },
      {
        test: /\.(less|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader:'css-loader',
            options:{
              minimize: true
            }
          }, {
            loader: "postcss-loader",
            options: {
              sourceMap: 'inline'
            }
          }, 'less-loader']
        })
      }, {
        test: /\.(jpg|png|gif|svg)$/,
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 4,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }]
      }, {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: ['file-loader']
      },{
        test: /\.(html)$/,
        use: [
        // {
        //   loader:'file-loader',
        //   options: {
        //     name:"[name][hash].[ext]"
        //   }
        // },
        // 'extract-loader',
        {
          loader: 'html-loader',
          options: {
            attrs: ['img:data-src','img:src'],
            minimize: true
          }
        }
        ]
      }
    ]
  }
};