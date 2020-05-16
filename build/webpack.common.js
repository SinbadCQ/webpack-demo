const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //关联文件

module.exports = {
    entry: {
        app: './src/main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'my-project',
            favicon: './public/favicon.ico',
            template: path.join(__dirname, '../public/index.html'), //webpack到模版的路径
            filename: path.join(__dirname, '../dist/index.html'),  //写入html的文件
            hash: true,    // 启动hash戳(启动hash戳(向所有包含的js和css添加一个webpack标记，用于缓存破坏))
            minify: {   // 压缩配置
                removeAttributeQuotes: true,  // 是否删除双引号
                collapseWhitespace: true,   // 是否打包成一行
            }
        })
    ],
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
                loader: 'babel-loader?cacheDirectory', //?开启转换结果缓存
                // exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'), //应用在实际需要转换的位置
            }
        ]
    }
}