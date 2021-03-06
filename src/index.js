import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import baseStyles from './styles/index'
import firebase from 'firebase'
import { BrowserRouter, Route } from 'react-router-dom'
import Properties from './properties'


  firebase.initializeApp({
    apiKey: Properties.firebase.apiKey,
    authDomain: Properties.firebase.authDomain,
    databaseURL: Properties.firebase.databaseURL,
    projectId: Properties.firebase.projectId,
    storageBucket: Properties.firebase.storageBucket,
    messagingSenderId: Properties.firebase.messagingSenderId
  });

const render = () => {
  baseStyles()

  ReactDOM.render((
    <BrowserRouter>
      <div>
        <Route path='/' component={App} />
      </div>
    </BrowserRouter>
  ), document.getElementById('root'));
  registerServiceWorker();
}

render()
