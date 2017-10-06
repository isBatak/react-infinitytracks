// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// var loaders = [
//   {
//     "test": /\.jsx?$/,
//     "exclude": /node_modules/,
//     "loader": "babel-loader",
//     "query": {
//       "presets": [
//         "babel-preset-es2015",
//         "babel-preset-react",
//         "babel-preset-stage-0"
//       ],
//       "plugins": [
//         "babel-plugin-transform-decorators-legacy",
//         "babel-plugin-transform-class-properties"
//       ]
//     }
//   }
// ];

// module.exports = {
//   devtool: 'eval-source-map',
//   entry: path.resolve('src', 'main.js'),
//   output: {
//     path: path.resolve('build'),
//     filename: 'main.js',
//     publicPath: '/'
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.jsx']
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve('src', 'index.tpl.html'),
//       filename: 'index.html',
//       inject: false
//     })
//   ],
//   module: {
//     loaders: loaders
//   }
// };

'use strict';

var webpack = require('webpack');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    library: 'react-multitrack',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  }
};
