import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function Html(props){
    const {assets, component,store} = props;
    const content = component? ReactDOM.renserToString(component) : '';
    const head = Helmet.rewind();

    return (
        <html lang="zh_CN">
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
                <link rel ="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />

                {
                    Object.keys(assets.styles).map((style,key) => 
                    <link 
                        href={assets.styles[style]} key={key} media="screen,projection"
                        rel="stylesheet" type="text/css"
                        charSet = "UTF-8"
                    />
                )}
            </head>
            <body>
                    <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
                    <script 
                        dangerouslySetInnerHTML={{
                            __html: `window.__INITIAL_STATE__ = ${ serialize(store.getState()) }`
                        }}
                    />
                    <script src={assets.javascript.main} charSet="UTF-8" />
            </body>
        </html>
    )
}

export default Html;

/**
 * 1.接受wp同构工具提供的键值对对象、store等作为props
 * 2.使用reacthelmet管理文档头信息
 * 3.便利wp同构工具提供的资源键值对对象，给Html添加独立出来的样式文件，只有在生产环境下。asset.styles才包含数据
 * 4.使用dangerous..防XSS攻击
 * 5.渲染来自服务端的预加载state和用于客户端渲染的脚本文件。serialize用于将JSON装换位字符串，它和json.stringify的区别在于可以输出json中的函数和正则表达式
 * 
*/
