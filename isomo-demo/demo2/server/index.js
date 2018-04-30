/*修改前
require('babel-register');
require('./server')
*/

//修改后
require('babel-register');

var path = require('path');
var rootDir = path.resolve(__dirname,'..');
var WebpackIsormorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
.development()
.server(rootDir, function(){
    requier('./server')
})

/**
 * 将服务器的入口文件放在webpackIsomorphicTools.server()的回调函数中
 * rootDir则是webpack-assets.json文件所在的目录
 * 
*/

