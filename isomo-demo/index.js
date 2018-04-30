var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

var config = { assets: {images: {extensions: ['png']}}};

new WebpackIsomorphicTools(config)
.development()
.server(__dirname, function(){
    console.log(requier('./Counter.png'))
})

/*
*config 用于指定扩展名为png的文件将可以被调用
.development()用于表示这是开发环境，将不会对webpack-assets.json进行缓存
.server()的第一个参数需要天喜webpack-assets.json文件所在的目录，第二个参数是个回调函数，通常填写nODEJS程序的入口，这样就可以在node中调用其他类型的资源文件了
 运行node index.js 便输出了/dist/Counter.png
**/