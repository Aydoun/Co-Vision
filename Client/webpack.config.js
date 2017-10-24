const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require.resolve('babel-preset-react-app')]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /\.css$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'}
        ]
      },
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules : [path.resolve(__dirname, 'app'), 'node_modules']
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3003/'
    })
  ]
};
