### bigger项目涉及的文件是除了isomo-demo文件夹以外的文件
## 1.开发服务器  (配置说明在对应的文件注释里)
在开发环境中，通常使用开发服务器为程序提供资源服务，实现代码的热替换
##### a.配置wp.    
webpack/dev.config.js
##### b.编写配置文件，设置经常变的变量  
src/config.js
##### c.wp同构工具的配置 
webpack/webpack-isomorphic-tools.js
## 2.独立的开发服务器
为了不让前端服务器阻碍开发服务器的运行，将开发服务器独立出来
##### a. 独立开发服务器    
webpack/webpack-dev-server.js
##### b. 启动开发服务器 
通常在package.json中编写脚本来启动 "watch-client":"node webpack/webpack-dev-server"
脚本命名为watch-client，表示见识客户端变动，在port+1端口开启服务，随时给客户端提供资源，并在代码变动时进行热替换
## 3.前端服务器
用于渲染组件并突出多个也额面，使用了多种技术，包括React组件的服务端渲染,React Router的服务端路由、wp同构渲染、数据与在和延迟渲染、代理API服务器、压缩等
##### a.配置前端服务器      
src/server.js  
##### b.使用组件渲染html页面      
src/utils/Html.js
编写一个html组件用于渲染Html页面，它是无状态函数，不同于普通组件，将其放到工具集目录下
##### c.启动前端服务器
bin/server.js  

为了在不同环境下启动前端服务器，专门编写了启动文件 
最后加入启动脚本     nodemon代替node在每次src文件夹中的文件发生变动时，能自动重启
```
"start-prod":"cross-env NODE_ENV=production node bin/server",
"start-dev":"nodemon --watch src bin/server.js",
```
FRONT-WEB-SERVER DONE!!

## 4.API服务器
universal 渲染的服务端指的是前端服务器，尽管可以在前端服务器中进行读写数据库/用户认证等。但由于前端服务器和客户端?共用一套代码，所以不管出于安全考虑，还是模块分离，都应该将api服务器独立出去。api服务器可以不用nodejs编写
##### a.配置api服务器  src/api/api.js
##### b.启动api服务器  bin/api.js
最后添加脚本npm启动
```
"start-api-dev":"nodemon --watch src/api bin/api.js",
"start-api-prod":"cross-env NODE_ENV=production node bin/api.js",
```



writting untill now ,it had been proved that the shortness of server  & node related knowledges prevented next learning step. such a huge & high fence standing there!!!


#生产环境下的构建编译
开发环境下的构建编译，比如使用RequireHook 来运行需要的babel 编译node程序，使用开发服务器来打包客户端的各种资源，但这些构建编译只是方便了开发，在生产环境下会引起包括内存消耗过大在内的各方面问题。所以需要考虑性能问题。
## 5.编译运行node.js
在生产环境下，应先使用babel编译node程序，然后使用node运行。
先删除上次编译的老旧文件，用node的删除工具rimraf，这里不仅删除了build文件夹，也删除了webpack的目标路径，及static/dist文件夹
``` "clean": "rimraf build static/dist"  ```
然后使用babel编译。src代表源文件目录，-d build代表目标路径为build,--copy-files代表将非js文件也拷贝到目标文件夹中
``` "build-server":"babel src -d build --copy-files"  ```
最后直接用node运行
``` 
    "start-prod":"cross-env BNODE_ENV=production node bin/server"


    "start-api-prod": "cross-env NODE_ENV=production node bin/api"
```
在生产环境下，入口文件已经发生了改变
看 bin/server.js
``` 
if(process.env.NODE_ENV === 'production'){
    global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
    .server(rootDir, function(){
        requier('../build/server')
    })

}
```
bin/api.js
```
if(process.env.NODE_ENV === 'production'){
    requier('../build/api/api');
}
```
开发环境依然使用的Require Hook.
## 6.生产环境下的wp配置
在生产环境中，不需要使用开发服务器来提供资源，而是直接将其打包到静态资源目录，然后在页面中引入入口文件即可。
看 webpack/prod.config.js

然后   
编写npm命令，
```
"prod":"npm run build && concurrently -k \"npm run start-api-prod\" \"npm run start-prod\"",

"dev":"concurrently -k \"npm run watch-client\" \"npm run start-api-dev\" \"npm run start-dev\"",

```
concurrently可以让多条命令平行启动

##公用代码
#### 工具集
为了目录的简约，将html组件函数、配置store的函数以及其他工具函数都放在了src/utils下，因为他们并不涉及逻辑。
