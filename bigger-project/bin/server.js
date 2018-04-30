
var path = require('path');
var rootDir = path.resolve(__dirname,'..');

var WebpackIsormorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

global.__SERVER__ = true;
global.DISABLE_SSR = false;

if(process.env.NODE_ENV === 'production'){
    global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))

    .server(rootDir, function(){
        requier('../build/server')
    })

}else{
    require('babel-register');
    global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
    .development()
    .server(rootDir, function(){
        requier('../build/server')
    })

}

