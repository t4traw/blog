const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const shellPlugin = require('webpack-shell-plugin')
const manifestPlugin = require('webpack-manifest-plugin')

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
      bundle: path.resolve(__dirname, 'assets', 'javascripts', 'index.js')
    },
    output: {
      path: path.resolve(__dirname, 'static'),
      filename: env.filename + '.js',
      chunkFilename: '[id].chunk.js'
    },
    plugins: [
      new CleanPlugin([path.resolve(__dirname, 'public')]),
      new shellPlugin({
        onBuildEnd: [env.command]
      }),
      new manifestPlugin({
        fileName: '../data/manifest.json'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [
            'style-loader',
            'css-loader',
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
                    preset: 'default'
                  })
                ]
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
  return config
}
