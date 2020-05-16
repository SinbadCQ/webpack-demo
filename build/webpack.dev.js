const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development', //启用开发模式内置优化
    devtool: 'inline-source-map', //debug
    devServer: {
        contentBase: '../src',
        progress: true,  // 是否显示进度条
        compress: true,  // 是否压缩
        // host: "0.0.0.0",
        // hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ]
    }
})