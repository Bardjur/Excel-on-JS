const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');


module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  const fileName = ext => !isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

  const plugins = () => {
    let arr = [
      new HtmlWebpackPlugin({
        title:'My Excel',
        filename:'index.html',
        template: './index.html'
      }),
      new CopyPlugin({
        patterns: [
          { 
            from: path.resolve(__dirname, 'src/favicon.ico'), 
            to: path.resolve(__dirname, 'dist') },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
    ];

    if (!isProd){
      arr.push(new ESLintWebpackPlugin());
    }

    return arr
  }

  return {
    context: path.resolve(__dirname, 'src'),

    entry : {
      main: ['@babel/polyfill', './index.js'],
    },

    output : {
      path: path.resolve(__dirname, 'dist'),
      filename: fileName('js'),
      clean: true,
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },

    devServer: {
      port: '3000',
      open: true,
      hot: true,
      watchFiles: './',
    },

    devtool: !isProd ? 'source-map' : false,

    plugins: plugins(),

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        }, 
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        }
      ],
    }
  }
}
