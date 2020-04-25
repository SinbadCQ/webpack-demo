const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //代码压缩
const common = require('./webpack.common.js');
// const WorkboxPlugin = require('workbox-webpack-plugin'); //离线访问
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //每次构建之前自动清理/dist文件夹
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// process.env.NODE_ENV 指定环境

module.exports = merge(common, {
    // devtool: 'source-map', //报错信息定位
    // 将公共模块抽离到一个公共的chunk
    optimization: {
        splitChunks: {
            name: 'nanifest'
        },
    },
    output: {
        filename: '../dist/assets/js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
        // crossOriginLoading: false, //默认禁用跨域加载
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'), //应用在实际需要转换的位置
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
                    loader: 'file-loader',
                    options: {
                        limit: 10000, // 8k
                        name: '../dist/assets/images/[hash:8].[ext]',
                        fallback: 'file-loader',  // 当超过8192byte时，会回退使用file-loader
                        publicPath: './' //采用相对路径
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10000, // 8k
                        name: '../dist/assets/font/[hash:8].[ext]',
                        fallback: 'file-loader',  // 当超过8192byte时，会回退使用file-loader
                        publicPath: './' //采用相对路径
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJSPlugin(),
        new UglifyJSPlugin({
            sourceMap: false,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(), //保证未修改的hashID保持不变
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助 ServiceWorkers 快速启用
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
        new ExtractTextPlugin({
            filename: '../dist/assets/css/[chunkhash:8].css'
        }),
    ]
})
