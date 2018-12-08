## Babel:
#### 用于把新版本的js代码翻译成大多数浏览器支持的ES5版本代码
## babel-loader :
#### 扩展记载器  关联 webpack与Babel
## babel-core:
#### 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
## babel-preset-env:
#### 根据配置环境计算Babel对代码填充何种等级的polyfill,
## babel-preset-[stage-0, stage-1, stage-2, stage-3, stage-4] :
#### 与ES7相关配置
## babel-preset-reac：
#### 使用jsx语法
## webpack-dev-server:
#### 浏览器监听你的代码的修改，并自动刷新显示修改后的结果
## postcss-loader autoprefixer
#### 自动添加css 前缀
## babel-plugin-react-transform react-transform-hmr
#### 配合webpack.HotModuleReplacementPlugin()实现热加载
## redux-logger    redux的日志中间件
## babel-polyfill    babel 默认只转换新的js语法，而不转换新的API，通过这个方法可以将新的API转换
## whatwg-fetch   fetch 兼容
## css-loader style-loader    webpack加载器,在js中引入的css样式将会被webpack构建成以动态方式插入到HTML文件中
#### css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能；
#### style-loader将所有的计算后的样式加入页面中；
## node-sass sass-loader   设置 scss
## file-loader url-loader
#### file-loader 引入的图片大于于8K ，将引入的图片加入[hash]
#### url-loader 引入的图片小于8K ，将会转换为base64，减少请求
## json-loader  解析json 文件
## npm run public  生产环境
#### windouws下设置 "public": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"
#### 其他电脑下设置 "public": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
