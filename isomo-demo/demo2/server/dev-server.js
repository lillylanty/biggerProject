var Express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../webpack.config');

var app = new Express();
var port = 7070;

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
        console.log(error)
    }else{
        console.info(`webpack development server listening on port ${port}`)
    }
})