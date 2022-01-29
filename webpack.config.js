const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWP = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = (env, argv) => {

  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = extention => isProd ? `'[name].[contenthash].bundle.${extention}` : `'[name].bundle.${extention}`

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
          template: './index.html',
          inject: 'body'
        }),
        new FaviconsWP('./favicon.ico'),
        new MiniCssExtractPlugin({
          filename: filename('css')
        })
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable',// babel polyfill
        'regenerator-runtime/runtime',// babel polyfill
        './index.js'
      ],
    },
    output: {
      clean: true,
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'core'),

      }
    },
    plugins: plugins(),
    devtool: isDev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    devServer: {
      port: 8080,
      open: true,
      hot: true,
      watchFiles:'./'
    }
  }
}

