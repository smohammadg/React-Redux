import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const logger = require('redux-logger').default;
const ReactReduxBasics = () => {
    // create constants
    const BUY_LAPTOP = 'BUY_LAPTOP';

    const initialState = {
        numberOfLaptops: 100  
    }

    // crate reducer
    const reducer = (state = initialState, action) => {
        if(action.type === BUY_LAPTOP){
            return { numberOfLaptops: state.numberOfLaptops - 1 }
        }
        else {
            return state;
        }
    }
    // create store
    const store = createStore(reducer, applyMiddleware(logger));
  
    console.log(store);

    // create action
    function buyLaptop(){
        return {
            type: BUY_LAPTOP,
            // data: '' // payload
        }
    }    
    store.dispatch(buyLaptop());
    store.subscribe(() => { 
        console.log('store get state',store.getState())
    });

    return(
        <div>
            <h1>React Redux Basics</h1>
        </div>
    )
}
export default ReactReduxBasics;




    // function buyLaptop(){
    //     return 'BUY_LAPTOP';
    // }