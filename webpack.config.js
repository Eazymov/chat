const path = require('path');
const webpack = require('webpack');

process.noDeprecation = true;

module.exports = {
  entry: {
    login: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      'fetch-polyfill',
      './public/src/login/main.js'
    ],
    main: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      'fetch-polyfill',
      './public/src/main/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/public/dist',
    filename: '[name].build.js'
  },
  devServer: {
    hot: true,
    port: 8000,
    publicPath: '/public/dist/',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader?name=/assets/[name].[ext]"
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            pug: 'pug-html-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  /*  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }), */
  ]
};
