var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var fontgen = require('fontgen-loader');
var merge = require('webpack-merge');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// require("font-awesome-webpack");
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
  entry: [PATHS.app],
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
        loaders: ['react-hot', 'babel']
        
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
          loader:  ExtractTextPlugin.extract('style-loader','css-loader'),
          exclude: './node_modules'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader:  ExtractTextPlugin.extract('file'),
          exclude: './node_modules'
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader:  ExtractTextPlugin.extract('url?limit=10000&mimetype=application/font-woff'),
          exclude: './node_modules'
        },
        {
          test: /\.woff2$/,
          loader:  ExtractTextPlugin.extract('url?limit=10000&mimetype=application/font-woff'),
          exclude: './node_modules'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader:  ExtractTextPlugin.extract('url?limit=10000&mimetype=application/octet-stream'),
          exclude: './node_modules'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader:  ExtractTextPlugin.extract('url?limit=10000&mimetype=image/svg+xml'),
          exclude: './node_modules'
        },
        {
          test: /\.png$/,
          loader:  ExtractTextPlugin.extract('url-loader?limit=100000'),
          exclude: './node_modules'
        },
        {
          test: /\.jpg$/,
          loader:  ExtractTextPlugin.extract('file-loader?limit=100000'),
          exclude: './node_modules'
        },
        {
          test: /\.gif$/,
          loader:  ExtractTextPlugin.extract('url-loader?limit=100000'),
          exclude: './node_modules'
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
      }, false, false),
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
          loaders: ["style", "css"],
          include: PATHS.app
        },
      {test: /^((?!config).)*\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader:"url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" }
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
