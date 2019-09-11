const path = require("path");

module.exports = {
  entry: path.resolve("./src/index.js"),
  devtool: "inline-source-map",
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
    modules: [
      path.resolve(__dirname, ""),
      path.resolve(__dirname, "src"),
      "node_modules",
    ],
  },
  output: {
    path: path.join(__dirname, "bin"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
};
