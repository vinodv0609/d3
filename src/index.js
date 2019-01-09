import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
ReactDOM.render(<App />, document.getElementById('root'));
const apireducer=(state=[],action)=>{
	return state;
}



const store=createStore(apireducer);
console.log(store.getState());

//console.log(store.getState());
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
