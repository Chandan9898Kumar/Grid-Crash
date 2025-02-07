const path = require("path"); //path is now a module that has access to pre defined methods that are built into Node.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //to use a plugin with webpack, you must use require
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development", //this will set the mode to production, which will minify the code and make it production ready

  // Add source-map optimization
  devtool: isProduction ? "hidden-source-map" : "eval-cheap-module-source-map",

  name: "React Webpack",

  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "/build"),
    pathinfo: true,
    filename: isProduction ? "[name].[contenthash].js" : "[name].[fullhash].js",
    chunkFilename: isProduction
      ? "[name].[contenthash].js"
      : "[name].[fullhash].js",
    libraryTarget: "umd",
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: "[name][ext]",
    sourceMapFilename: "[name].js.map",
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"], // Automatically resolve certain extensions
    alias: {
      App: path.resolve(__dirname, "src/App.js"), // Alias for App.js
      Components: path.resolve(__dirname, "src/components/"), // Alias for components directory
      Common: path.resolve(__dirname, "src/Common/"), // Alias for common directory
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"], // Look for modules in src and node_modules
    symlinks: false, // Don't follow symlinks
    cacheWithContext: false,
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    new HtmlWebpackPlugin({
      //this plugin will help us generate the production html file in our /build
      filename: "index.html", //our production html file will be named index.html
      template: "./src/index.html", //this is a template for our production html file, we are defining how the html will look like before we make our production html file
      favicon: "./src/Common/Icons/tic.png",
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
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
      filename: isProduction
        ? "[name].[contenthash].css"
        : "[name].[fullhash].css",
      chunkFilename: isProduction
        ? "[name].[contenthash].css"
        : "[name].[fullhash].css",
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/serviceWorker.js",
      swDest: "service-worker.js",
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
        exclude: /node_modules/,
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
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
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
      new CssMinimizerPlugin(),
    ],
    flagIncludedChunks: true,
    usedExports: true,
    sideEffects: true,
  },

  performance: false,
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
