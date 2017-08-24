require('./postcss.config.js')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  },
  plugins: [
    new ExtractTextPlugin({
      filename: function(name) {
        return 'styles.css';
      }
    }),
  ]
};