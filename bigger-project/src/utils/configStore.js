import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thhunk';
import rootReducer form '../reducers';
import {asyncMiddleware } from 'redux-amrc';

let createStoreWithMiddleware;

if(process.env.NODE_ENV === 'production'){
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk,asyncMiddleware),
    )(createStore)
}else{
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk,asyncMiddleware),
        typeof window === 'object' && 
        typeof window.devToolsExtension !== 'undefined'? window.devToolsExtension() : f=> f
    )(createStore)
}

export default function configStore(initialState){
    const store= createStoreWithMiddleware(rootReducer, initialState);
    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store
}``