var path = require('path');
var htmlWebpackPlugin = require("html-webpack-plugin");
var extractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack'); //访问内置的插件

module.exports = {
    entry: './src/script/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        open : true
    },
    resolve: {
        extensions: ['.js','.css'],
        alias: {
            jQueryUI: path.resolve(__dirname,"src/script/lib/jquery-ui.js"),
            jQueryFullPage: path.resolve(__dirname,"src/script/lib/jquery.fullPage.min.js")
        }
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                   fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options:{
                           minimize: true
                        }
                    }
                })
            },{
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, "sass-loader"]
                })
            },{
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "images/[name].[hash:7].[ext]"
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            inject: 'true',
            template: "index.html"
        }),
        //provide $, jQuery and window.jQuery to every script
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new extractTextPlugin({
            filename: "css/index.css"
        })
    ]
}
