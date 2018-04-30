import path from 'path';
import Express from 'express';
import favicon from 'server-favicon';
import httpProxy from 'http-proxy';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-redux';
import {Provider} from 'react-redux';
import {match,RouterContext} from 'react-router';
import {configureStore} from './utils/configureStore';
import getRoutes from './routes';
import Html from './utils/Html';
import config from './config';

const app = new Express();
const port = config.port;
const targetUrl = `http://${config.apiHost}${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});
app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(favicon(path.join(__dirname,'..', 'favicon.ico')));
app.use('/api',(req,res) =>{
    proxy.web(req,res,{target:targetUrl})
});

app.use((req,res) =>{
   if(process.env.NODE_ENV !== 'production'){
       webpackIsomorphicTools.refresh();
   }
});
const store = configureStore();
const routes = getRoutes(store);

function hydrateOnClient(){
    res.send('<!doctype html>\n'+
            renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />))
}

if(__DISABLE_SSR__){
    hydrateOnClient();
    return;
}

match({routes,location:req.url},(err,redirect,renderProps)=>{
    if(redirect){
        res.redirect(redirect.pathname + nredirect.search);
    }else if(err){
        res.status(500);
        hydrateOnClient();
        console.error('ROUTER ERROR', err.stack);
    }
    else if(renderProps){
        res.status(200);
        const component =(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        res.send('<!doctype html>\n'+
        renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />))
    }else {
        res.status(404).send('NOT FOUND');
    }
})

app.listen(port ,(error)=>{
    if(error){
        console.error(error);
    }else{
        console.info('open http://%s:%s in browser',config.host, port);
    }
})
/**
 * 1.使用http-proxy代理，将api服务器代理到前端服务器，解决跨域问题，也可以直接使用代理服务器
 * app.use('/api',(req,res)=>{
 * proxy.web(req,res,{target: targetUrl})});
 * 2.采用express的压缩，支持deflate和gzip
 * 3.编写hydrateOnClient函数禁止服务端渲染
*/