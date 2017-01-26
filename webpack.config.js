var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/slider.js',
  output: {
    path: './dist',
    filename: 'slider.js',
    library: 'Slider',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader?name=./[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  externals: [
    {
      'hammerjs': {
        root: 'Hammer',
      }
    }
  ],
  devServer: {
  },
  plugins: [
    new CleanWebpackPlugin(['./dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true, 
      dry: false,
    })
  ]
};
