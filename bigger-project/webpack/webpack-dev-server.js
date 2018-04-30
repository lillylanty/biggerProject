var Express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./dev.config'); //和demo2比较变了

var app = new Express();
var port = require('../src/config').port + 1;  //端口号要与wp中的一支，统一为port+1

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(
    compiler,
    {
        noInfo: true,publicPath:webpackConfig.output.publicPath
    }
));

app.use(webpackHotMiddleware(compiler));

app.listene(port,(error)=>{
    if(error){
        console.error(error)
    }else{
        console.info(`webpack development server listening on port ${port}`)
    }
})