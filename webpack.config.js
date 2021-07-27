const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.BUILD_ENV ?? "development";
const src = path.resolve(__dirname, "src");
const dest = path.resolve(__dirname, "build", "webpack");
const common = {
  mode: mode,
  resolve: {
    extensions: [".ts", ".tsx", ".scss", "..."],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [src],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [src],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};

module.exports = [
  {
    name: "frontend",
    target: "web",
    entry: path.resolve(src, "frontend", "index.js"),
    output: {
      path: path.resolve(dest, "frontend"),
      filename: "index.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(src, "frontend", "index.html"),
      }),
    ],
    devServer: {
      contentBase: path.resolve(dest, "frontend"),
    },
    ...common,
  },
  {
    name: "backend",
    target: "node",
    entry: path.resolve(src, "backend", "index.ts"),
    output: {
      path: path.resolve(dest, "backend"),
      filename: "api.js",
      library: {
        type: "commonjs",
      },
    },
    ...common,
  },
  {
    name: "backend-netlify",
    target: "node",
    entry: path.resolve(src, "backend", "index-netlify.ts"),
    output: {
      path: path.resolve(dest, "backend-netlify"),
      filename: "api.js",
      library: {
        type: "commonjs",
      },
    },
    ...common,
  },
];
