if(process.env.NODE_ENV === 'production'){
    requier('../build/api/api');
}else{
    requier('babel-register')
    requier('../src/api/api')
}