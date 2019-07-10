const webpack = require('webpack')
const path = require("path")
const glob = require('glob')
const CleanPlugin = require('clean-webpack-plugin')
const shellPlugin = require('webpack-shell-plugin')
const manifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const hugoSrc = path.resolve(__dirname, "site")

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
  var env = set()

  var config = {
    watch: env.watch,

    context: __dirname,

    resolve: {
      extensions: ['.js', '.sass', '.scss', '.css']
    },

    entry: {
      bundle: path.resolve(__dirname, 'assets', 'javascripts', 'index.js'),
    },

    output: {
      path: path.resolve(__dirname, 'static'),
      filename: env.filename + '.js',
      chunkFilename: '[id].chunk.js',
    },

    plugins: [
      new CleanPlugin([
        path.resolve(__dirname, 'public')
      ]),
      new shellPlugin({
        onBuildEnd: [env.command]
      }),
      new manifestPlugin({
        fileName: '../data/manifest.json',
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, 'layouts')}/**/*`, { nodir: true }),
      }),
    ],
    module: {
      rules: [{
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')({
                    grid: true
                  }),
                  require('csswring')(),
                  require('cssnano')({
                    preset: 'default',
                  }),
                  
                ]
              },
          },
          "sass-loader"
        ]
      }]
    }
  }
  return config
}
