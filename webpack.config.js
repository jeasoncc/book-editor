const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Autoprefixer = require("autoprefixer")
// const workboxPlugin = require("workbox-webpack-plugin");
// const workboxConfig = require("./workbox-config.js")
const path = require("path");
const mode = process.env.NODE_ENV || "development";
const isProduction = mode === "production";
const isDevelopment = !isProduction;
module.exports = {
  entry: {
    bundle: ["./src/main.js"]
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte" ),
      src: path.resolve(__dirname, 'src')
    },
    extensions: [".mjs", ".js", ".svelte",'.tsx', '.ts'],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  output: {
    clean: true, 
    path: __dirname + "/public/build",
    publicPath: '/build/',
    filename: "[name].js",
    chunkFilename: "bundle.[name].js"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
							dev: isDevelopment
						},
            emitCss: isProduction,
            preprocess: require("svelte-preprocess")({
              scss: true,
							sass: true,
							postcss: {
								plugins: [
                  Autoprefixer
                ]
							}
            }),
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
           isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
		hot: false,
    liveReload: true,
    open: true,
	},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    //需要配置sevice worker时解开
    // new workboxPlugin.GenerateSW(workboxConfig)
  ],
  // node: {
  //   fs: "empty"
  // },
  mode,
  devtool: isProduction ? false : "source-map"
};