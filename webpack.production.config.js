const path = require('path');
// const glob = require('glob');
const webpack = require('webpack');
/*
HtmlWebpackPlugin插件的作用是依据一个简单的index.html模板，
生成一个自动引用你打包后的JS文件的新index.html。
这在每次生成的js文件名称不同时非常有用（比如添加了hash值）
 **/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// /*
// 'purifycss-webpack'  生成只需要的css代码，精简css代码
//  **/
// const PurifyCSSPlugin = require('purifycss-webpack');

/*
'extract-text-webpack-plugin'分离CSS和JS文件
**/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，
因此使用插件clean-webpack-plugin
去除public文件中的残余文件
**/
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    /*
  使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
  这个选项可以在不影响构建速度的前提下生成完整的sourcemap，
  但是对打包后输出的JS文件的执行具有性能和安全的隐患。
  在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
  **/
    devtool: 'none',   // 成产环境下

    entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'], // 入口文件

    output: {
        filename: 'bundel-[hash].js', // 打包后 生成的文件名称
        path: path.resolve(__dirname, 'dist'), // 打包后生成的文件路径
        publicPath: 'http://localhost:8080/'    //生产环境域名
    },
    resolve: {
        extensions: [" ",".js",".jsx",".css",".scss"],  // 用于省略后缀名
        // alias: {   // 处理别名
        //     // components: path.resolve(__dirname, 'src/components/'),
        //     //
        //     // css: path.resolve(__dirname, "src/css/"),
        //     //
        //     // model: path.resolve(__dirname, 'src/model/'),
        //     //
        //     // store: path.resolve(__dirname, 'src/store/')
        // }
        // alias: {
        //     'ASYNC': 'src/index.js'
        // }
    },
    module: {

        rules: [
            /* 在 module.rules中添加规则，这个规则只要匹配到js后缀的文件就会使用
              babel-loader进行转换，转换过程依次使用了plugins和presets制定的扩展。
              注意：presets的处理顺序是从右到左顺序执行的。
              **/
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules中的js后缀文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react'],
                        /*
                        babel-plugin-import:
                        因为这是Babel的插件，所以它的配置要在babel-loader的plugins节点中配置
                        **/
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
            /*
              * js中引入的css样式将会被webpack构建成以动态方式插入到html文件中
             **/
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                // options: {
                                //     modules: true,     // 指定启用css node_modules
                                //     localIdentName: '[path][name]-[local]-[hash:base64:5]'   // 指定css类名格式
                                // }
                            },
                            {
                                loader: 'postcss-loader',   // 自动添加css 前缀
                                options: {
                                    sourceMap: true,
                                    config: {
                                        path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                                    }
                                }
                            }
                        ]
                        //   antd的样式是放在node_modules中的，不要添加exckude命令包删除node_modules
                        //   **/
                        //   // exclude: /node_modules/
                    })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            // options: {
                            //     modules: true,     // 指定启用css node_modules
                            //     localIdentName: '[path][name]-[local]-[hash:base64:5]'   // 指定css类名格式
                            // }
                        },
                        {
                            loader: 'postcss-loader',   // 自动添加css 前缀
                            options: {
                                sourceMap: false,
                                config: {
                                    path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: false
                            }
                        },
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
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
    /*
  Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，
  loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），
  一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

  插件（Plugins）是用来扩展webpack功能的，它会在整个构建过程中，执行相关任务。
  **/
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // 给打包后的代码添加版权声明
        new webpack.optimize.DedupePlugin(),            // 文件内容深度去重
        new HtmlWebpackPlugin(
            {
                template: path.join(__dirname) + '/src/index.html'     // 指定静态模板
            }
        ),
        new webpack.HotModuleReplacementPlugin(),   // 热加载    依赖babel-plugin-react-transform  react-transform-hrm
        new webpack.optimize.OccurrenceOrderPlugin(),  // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(    // 压缩JS代码；
            {
                compress: {
                    warnings: false,
                    drop_console: false    // console.log
                }
            }
        ),
        new webpack.optimize.CommonsChunkPlugin(  // 将单独的部分作为chunk 提出去，减小文件体积，这里的name 要和 entry中对应
            {
                name:'src/index.js',
                filename:'[name].js'
            }
        ),
        new ExtractTextPlugin(     //   css  代码 分离后  指定的文件名
            {
                filename: '[name].css',
                disable: false
            }
        ),
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, 'dist/*.js')),
        //     minimize:true,
        //     purifyOptions:{
        //         minify:true
        //     }
        // }),
        new CleanWebpackPlugin(    // 去除public文件中的残余文件
            'dist/*',
            {
                root: __dirname,
                verbose: true, // 将日志写入控制台
                dry: false      // 使用布尔值“true”来测试/模拟删除。（不会删除文件）  默认：false  - 删除文件
            }
        )
    ]
};
