const path = require("path"); //path is now a module that has access to pre defined methods that are built into Node.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //to use a plugin with webpack, you must use require
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  name: "React Webpack",

  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "/build"),
    pathinfo: true,
    filename:
      process.env.NODE_ENV === "production"
        ? "[name].[chunkhash].js"
        : "[name].[fullhash].js",
    chunkFilename:
      process.env.NODE_ENV === "production"
        ? "chunk.[name].[chunkhash].js"
        : "chunk.[name].[fullhash].js",
    libraryTarget: "umd",
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: "[name][ext]",
    sourceMapFilename: "[name].js.map",
  },

  plugins: [
    new HtmlWebpackPlugin({
      //this plugin will help us generate the production html file in our /build
      filename: "index.html", //our production html file will be named index.html
      template: "./src/index.html", //this is a template for our production html file, we are defining how the html will look like before we make our production html file
      favicon: "./src/Common/Icons/tic.png",
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
      inject: true,
      hash: true,
      title: "development",
      description: "HtmlWebpackPlugin",
    }),

    new CleanObsoleteChunks({
      verbose: true,
      deep: true,
    }),

    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        "!stats.json",
        "!important.js",
        "!folder/**/*",
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  devServer: {
    port: 3001,
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "localhost",
    server: "http",
    allowedHosts: "auto",
    client: {
      progress: true,
      reconnect: true,
    },
  },

  module: {
    rules: [
      {
        //loaders are transformations that are applied to files (typescript to javascript, sass to css)
        test: /\.js$/,
        use: {
          loader: "babel-loader", //for all .js files, we will load the babel transpiler
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] }, //preset-env is a group of babel plugins that will transpile all the new features of javascript
        }, //preset-react is also a group of babel plugins, but it will transpile jsx with other new features of javascript
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }], //using style loader and css loader to load css onto application
      },
      {
        test: /\.(png|jpg|webp|mp4|wav|svg)$/,
        type: "asset/resource", //asset/resource loads files such as images, audio and videos
      },
    ],
  },

  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: false,
          mangle: true,
          output: { comments: false, ascii_only: true },
        },
      }),
    ],
    flagIncludedChunks: true,
    usedExports: true,
    sideEffects: true,
  },

  performance: false,
};
