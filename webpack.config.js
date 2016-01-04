var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);

// Load *package.json* so we can use `dependencies` from there

var pkg = require('./package.json');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app/js/RRouter.jsx'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        
       }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Squad Stream',
      template: 'index.html', // Load a custom template 
      inject: 'body' // Inject all scripts into the body 
    })
  ]
};


if(TARGET === 'build' || TARGET === 'stats' || TARGET === 'deploy') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    sourcemaps: {
      enabled: false
    },
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css', 'css!style-loader!css-loader', 'bootstrap!imports?jQuery=jquery',  'jpg!file-loader', 'woff(\?v=\d+\.\d+\.\d+)?!url?limit=10000&mimetype=application/font-woff', 'ttf(\?v=\d+\.\d+\.\d+)?!url?limit=10000&mimetype=application/octet-stream', 'eot(\?v=\d+\.\d+\.\d+)?!file', 'png!url-loader?limit=100000', "css!url?prefix=font/&limit=5000"),
          include: PATHS.app
        }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new Clean([PATHS.build]),
      // Output extracted CSS to a file
      new ExtractTextPlugin('styles.[chunkhash].css'),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}


if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
     module: {
      loaders: [
        // Define development specific CSS setup
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: PATHS.app
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
       stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),

    ]
  });
}
