const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const fileName = ext => isDev ? `boundle.${ext}` : `boundle.[hash].${ext}`
const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
        alias: {
            '@Exel': path.resolve(__dirname, 'src'),
            '@Core': path.resolve(__dirname, 'core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 5000,
        hot: isDev,
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/public/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ],
    },
}
