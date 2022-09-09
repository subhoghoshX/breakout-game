/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
    mode: 'development',
    entry: './src/game.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gitf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(mp3|wav)$/i,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '2d BreakOut Game'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
}
