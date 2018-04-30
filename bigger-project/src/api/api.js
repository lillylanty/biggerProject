import Express from 'express';
import config from '../config';
import controllers from './controllers';

const port  = config.apiPort;
const app = new Express();

controllers(app);

app.listen(port, (error)=>{
    if(error){
        console.error(error)
    }else{
        console.info('app is listening on port ',port)
    }
})