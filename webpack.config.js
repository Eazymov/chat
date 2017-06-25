const webpack = require('webpack')
const path = require('path');

module.exports = {
  entry: {
    login: [
      'webpack-hot-middleware/client',
      './src/login/main.js',
      'babel-polyfill',
      'fetch-polyfill'
    ],
    main: [
      'webpack-hot-middleware/client',
      './src/main/main.js',
      'babel-polyfill',
      'fetch-polyfill'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].build.js'
  },
  devServer: {
    hot: true,
    port: 8000,
    publicPath: '/assets/',
    contentBase: 'dist/',
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
        loader: "file-loader"
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
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
