'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	resolve:{
		extensions: ['', '.js', '.scss', '.css', '.less'],
		alias: {
			leafletcss: path.join(__dirname, '/node_modules/leaflet/dist/leaflet.css'),
			normalize: path.join(__dirname, '/node_modules/normalize.css/normalize.css'),
			bootstrap: path.join(__dirname, '/node_modules/bootstrap/less/bootstrap.less')
		}
	},
  entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname,'frontend/main.js')
	],
  output: {
    path: path.join(__dirname,'/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
	plugins: [
		new HtmlWebpackPlugin({
      template: 'frontend/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
	],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    },


		{ test: /\.scss$/, loaders:['style', 'css', 'sass']},
		// image loading for leaflet images
		{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
		{test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
		{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
		{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
		{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
		{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }

		/*{
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }*/
		]
  }
};
