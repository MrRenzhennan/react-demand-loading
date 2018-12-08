const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'none',   // 成产环境下

    entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'], // 入口文件

    output: {
        filename: 'bundel-[hash].js', // 打包后 生成的文件名称
        path: path.resolve(__dirname, 'dist'), // 打包后生成的文件路径
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true, // 不跳转
        inline:true,// 启用inline 模式  实时刷新
        port: 8080,
        contentBase: path.resolve(__dirname, "/dist"),   // 本地服务器加载的页面所载的目录
        // proxy: {
        //     "/api": {
        //         target:"xxxxx",
        //         secure:false,// 处理https
        //         changeOrigin:true, // 跨域
        //     }
        // }
    },
    resolve: {
        extensions: [" ",".js",".jsx",".css",".scss"],  // 用于省略后缀名
        // alias: {
        //     'ASYNC': '/src/index.js'
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules中的js后缀文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react'],
                        plugins: [
                            // ['react-hot-loader/babel'],
                            [
                                'import',
                                {
                                    'libraryName': 'antd', 'style': 'css'
                                },
                                // 热加载
                                'react-transform',
                                {
                                    'transforms': [
                                        {
                                            'transform': 'react-transform-hmr',
                                            'imports': ['react'],
                                            'locals': ['module']
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        // options: {
                        //     modules: true,     // 指定启用css node_modules
                        //     localIdentName: '[path][name]-[local]-[hash:base64:5]'   // 指定css类名格式
                        // }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    // options: {
                    //     modules: true,     // 指定启用css node_modules
                    //     localIdentName: '[path][name]-[local]-[hash:base64:5]'   // 指定css类名格式
                    // }
                },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    },{
                        loader: "sass-loader"
                    }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,             // 图片小于8K，转换成beas64，大于8K，加[hash]
                loader: "url-loader?limit=8192&name=build/img/[name].[hash:8].[ext]"
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.join(__dirname) + '/src/index.html'     // 指定静态模板
            }
        ),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
};
