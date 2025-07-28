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
         test: /\.s[ac]ss$/i,
         exclude: /bootstrap\.min\.css$/i,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
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
    ...['index', 'product', 'checkout', 'payment', 'contact', 'search'].map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/${page}.html`,
        filename: `${page}.html`,
        chunks: ['app']
      });
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),
    new CssMinimizerPlugin()
  ]
};
