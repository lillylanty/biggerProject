var WebpackIsormorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var config ={
    assets:{
        images:{extensions: ['png']},
        style_modules:{
            extensions:['css','scss'],
            filter:function(module,regex,options,log){
                if(options.development){
                    return WebpackIsormorphicToolsPlugin.style_loader_filter(module,regex,options,log);
                }else{
                    return regex.test(module.name); //默认导出
                }
            },
            path: function(module,options,log){
                if(options.development){
                    return WebpackIsormorphicToolsPlugin.style_loader_path_extractor(module,options,log);
                }else{
                    module.name
                }
            },
            parser: function(module,options,log){
                if(options.development){
                    return WebpackIsormorphicToolsPlugin.style_loader_parser(module,options,log);
                }else{
                    return module.source
                }
                
            },
        }
    }
};
module.exports = config;

