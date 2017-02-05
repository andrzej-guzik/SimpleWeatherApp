const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [ "axios" ];

const config = {
    entry: {
        scripts: "./src/app.js",
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
				test: /\.js$/,
                use: ["babel-loader", "eslint-loader"],                
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                        loader: "css-loader?importLoaders=1!postcss-loader"
                })
            },
            {
                test: /\.(jpe?g|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: { limit: 40000 }
                    },
                    "image-webpack-loader"
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = config;
