const path = require("path");
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const shellPlugin = require('webpack-shell-plugin');
const manifestPlugin = require('webpack-manifest-plugin');

const hugoSrc = path.resolve(__dirname, "site");
const dest = path.resolve(__dirname, ".tmp");

const hugoDev = `hugo --buildDrafts --watch --source ${hugoSrc} --destination ${dest}`;
const hugoProduction = `hugo --source ${hugoSrc} --destination ${dest}`;

function set() {
  switch (process.env.APP_ENV) {
    case 'dev':
      return {
        watch: true,
        filename: '[name]',
        command: 'hugo serve --buildDrafts'
      }
    default:
      return {
        watch: false,
        filename: '[name].[hash]',
        command: 'hugo'
      }
  }
}

module.exports = () => {
  var env = set();

  var config = {
    watch: env.watch,

    context: __dirname,

    resolve: {
      extensions: ['.js', '.sass', '.scss', '.css']
    },

    entry: {
      main: path.resolve(__dirname, 'assets', 'javascripts', 'index.js'),
    },

    output: {
      path: path.resolve(__dirname, 'static'),
      filename: env.filename + '.js',
      chunkFilename: '[id].chunk.js',
    },

    plugins: [
      new CleanPlugin([
        path.resolve(__dirname, 'static'),
        path.resolve(__dirname, 'public')
      ]),

      // Run hugo command after build
      new shellPlugin({
        onBuildEnd: [env.command]
      }),

			/*
			Creates manifest file for cachebustable assets
			Leave this plugin to the last, so it can be 'popped' for dev env, otherwise
			hugo will unnecessarily rebuild the site for each webpack build
			*/
      new manifestPlugin({
        fileName: '../data/manifest.json',
      }),
    ],

    module: {
      rules: [{
        test: /\.(css|scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }]
    }
  };

  return config;


  // mode: 'development',
  // entry: [
  //   './assets/javascripts/index.js'
  // ],
  // output: {
  //   path: __dirname + '/.tmp/dist',
  //   filename: 'javascripts/bundle.js'
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(sass|scss)$/,
  //       use: [
  //         "style-loader",
  //         "css-loader",
  //         "postcss-loader",
  //         "sass-loader"
  //       ]
  //     },
  //   ]
  // },
  // plugins: [
  //   new WebpackShellPlugin({
  //     onBuildEnd: this.mode === 'production' ? hugoProduction : hugoDev
  //   })
  // ]
};
