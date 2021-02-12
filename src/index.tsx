import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import firebase from 'firebase';
defineCustomElements(window);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBPex5N3xhaX5wB9jBfJtU_ggSGx0vw74Y',
    authDomain: 'snapril20-nantes.firebaseapp.com',
    projectId: 'snapril20-nantes',
    storageBucket: 'snapril20-nantes.appspot.com',
    messagingSenderId: '135308886756',
    appId: '1:135308886756:web:9ab1be54b81e62f3bda2f1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
