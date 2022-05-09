/* eslint-disable */
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const minimizeCssWebpackPlugin = require('css-minimizer-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin'); 


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config =   {
         splitChunks: {
             chunks: 'all'
         }
     }
 
     if(isProd){
         config.minimizer = [
             new minimizeCssWebpackPlugin(),
             new terserWebpackPlugin()
         ]
     }
 
     return config
 }

 const JSLoader = (extra) => {
    const opts = {
        presets: ['@babel/preset-env']
      };

      if(extra){
          opts.presets.push(extra);
      }

      return opts;
}

const CssLoaders = (extra) => {
    const loader = [{
        loader:MiniCssExtractPlugin.loader
   }, 'css-loader']
   if(extra){
       loader.push(extra);
   }
   return loader;
}


module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: {
        main: ['./index.js']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },
    plugins:[
        new HTMLWebpackPlugin({
            //  name: 'webpack Me',
             template: './index.html',
             minify:{
                 collapseWhitespace: isProd
             }
         }),
    new CleanWebpackPlugin(),
    // new copyWebpackPlugin({
    //     patterns:[
    //     {
    //         from: path.resolve(__dirname,'src/favicon.ico'),
    //         to: path.resolve(__dirname, 'dist')
    //     }
    // ]}),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
    })
    ],
    module:{

        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: JSLoader()
                }
            },

            {
                test: /\.css$/,
                use: CssLoaders()
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },

            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
             },

             {
                test: /\.s[ca]ss$/,
                use: CssLoaders('sass-loader')
            }


        ]

    }

    
}