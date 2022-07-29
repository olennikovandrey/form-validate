import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import  MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[hash].js",
  },
  target: ["web", "es2015"],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    liveReload: true,
    compress: true,
    port: 3000,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf)?$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(ico|png)$/,
        loader:"url-loader"
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "assets"),
          to: "./assets",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
    }),
  ],
};

export default config;
