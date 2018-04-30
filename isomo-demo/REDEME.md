## webpack 同构工具的功能
使用wp可以实现javascript中调用图片、样坏死、字体等资源文件，者和调用js中的模块一样require('./Counter.png)
但是，这只可以在浏览器中运行，为了实现统一渲染，必须想办法让nodejs中的require方法和浏览器环境下的requre方法保持一致，于是运用webpack同构工具
工具的工原理是：
在webpack打包的javascript脚本时生成包含一系列键值对的webpack-assets.json文件
给nodejs的require方法打补丁，使其可以返回webpack-assets.json文件中的匹配值

#### 服务端调用
在node中只能使用requir调用js模块，调用其他资源将会报错但使用了同构工具，在node中就勀调用其他资源文件了，如图片、字体。
##### 1.安装工具 webpack-isomorphic-tools
##### 2.添加webpack-assets.json.  
这个文件提供了一系列的键值对，”键“对应的是require()中的参数，”值“这是require()返回值。该文件是wp打包时候生成的，无需添加
#####  3.编写配置制定需要加载的文件类型，然后实例化这个工具，最后在实例化对象的server()方法中填写程序的入口。
看index.js

#### 客户端调用
指在浏览器环境中使用require()调用各种资源文件。对于在浏览器中运行的代码而言，只要使用了webpack打包，就可以直接使用require调用其他资源类型。但为了生成给服务端用的webpack-assets.json文件。还需在webpack.config.js中加入同构插件。 看client下的文件
##### 1.编写程序入口文件。该文件的作用是在页面中添加一张图片
##### 2.编写html,添加大包后js脚本
##### 3.编写wp配置，使其既可以调用格式的图片，又可以生成服务端使用的webpack-assets.json文件

真实场景 看demo2下的文件
#### 1. 配置服务器的入口
使用webpack同构工具的第一步是修改服务器的入口，使得服务器中的代码可以使用require调用各种文件 请看demo2/server/index.js
#### 2.独立开发服务器
使用了同构工具后，应将开发服务器和发送页面的服务器分开，如果不分开，同构工具找不到webpack-assets.json文件，webpackIsomorphicTools.server()的回调函数将无法被处罚，require('./server')引入入口文件也不会被执行，由于开发服务器在这个./server中，所以开发服务器也不会运行，进而webpack-assets.json文件无法被wp编译生成，程序将一直停留在寻找.json文件的状态。
看demo2下的server/dev-server.js
#### 3.配置webpack
配置完服务端程序入口，也将开发服务器独立出来，接下来需要配置为wp.使其既可以配合开发服务器完成普通的打包任务，又可以生成供服务端使用的webpack-assets.json文件。
##### a.指定cotext选项为webpackassets.json文件所在的目录，即根目录
##### b.添加wp同构工具的插件
##### c.由于将开发服务器独立到了7070端口，还需将指定热替换的路径为http://localhost:7070/__webpack_hmr.
##### d.添加styleloaser和css-loader
#### 4.配置wp同构工具
如果要使用style-loader和cssloader调用样式文件，配置信息需要使用wp同构工具的方法 看webpackiso...-tools.js
#### 5.在服务嘟啊和客户端使用require()
运行Counter.js会发现图片有一个由大变小的过程，这是因为服务端突出的页面没有样式，需要等到客户端使用style-loader将样式写入页面后才会生效，如果在生产环境下，应把css文件提取出来，作为单独的文件嵌入页面上方，就不会闪屏了
