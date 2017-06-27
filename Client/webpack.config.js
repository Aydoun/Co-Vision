const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  cache: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules : [path.resolve(__dirname, 'app'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: __dirname,
        loader: 'babel-loader',
        options: {
             presets: ['es2015', 'react', 'stage-0','react-hmre'],
        }
      },
      {
        test: /\.less$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'less-loader',options: {sourceMap:true}}
        ]
      },
      {
        test: /\.css$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'}
        ]
      },
      {
        test: /\.((woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|ttf|eot|svg|jpe?g|png|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name:'fonts/[hash:8].[name].[ext]'
        }
      }
    ]
  }
};
