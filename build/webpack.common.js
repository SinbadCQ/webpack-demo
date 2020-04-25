const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //关联文件

module.exports = {
    mode: 'production',
    entry: {
        app: './src/main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'my-project',
            template: path.join(__dirname, '../index.html'),
            filename: path.join(__dirname, '../dist/index.html'),  // 打包后的文件名字
            hash: true,    // 启动hash戳(出现缓存问题)
            minify: {   // 压缩配置
                removeAttributeQuotes: true,  // 是否删除双引号
                collapseWhitespace: true,   // 是否打包成一行
            }
        }),
    ]
}