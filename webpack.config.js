
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require('path');


module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: false,
    port: 9000,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    }
  },
  stats: {
    children: true
  },

    module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    
      {
        test: /\.css$/i,
         exclude: /bootstrap\.min\.css$/i,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
        ],
      },
      {
          test: /bootstrap\.min\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options:{
                postcssOptions:{
                  plugins:[require('rtlcss')],
                },
              },
            },
        ],
      },
    
        { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator:{
          filename:"./images/[name][ext]"
        }
         
      },
                    { 
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator:{
          filename:"./fonts/[name][ext]"
        }
         
      },

    ],
      
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename:"index.html",
        template: "./src/index.html"
    }),
     new HtmlWebpackPlugin({
        filename:"product.html",
        template: "./src/product.html"
    }),
     new HtmlWebpackPlugin({
        filename:"checkout.html",
        template: "./src/checkout.html"
    }),
     new HtmlWebpackPlugin({
        filename:"payment.html",
        template: "./src/payment.html"
    }),
    new HtmlWebpackPlugin({
        filename:"contact.html",
        template: "./src/contact.html"
    }),
     new HtmlWebpackPlugin({
        filename:"search.html",
        template: "./src/search.html"
    }),


    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),
    new CssMinimizerPlugin()
  ]
};
