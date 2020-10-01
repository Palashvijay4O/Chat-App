import React from "react";
import ReactDOM from 'react-dom';
import App from  '../components/index/App';

// const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');

ReactDOM.render(
    <App />, 
    document.getElementById('root')
)

document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})

// var hidden, state, visibilityChange; 
// if (typeof document.hidden !== "undefined") {
//     hidden = "hidden";
//     visibilityChange = "visibilitychange";
//     state = "visibilityState";
// }

// document.addEventListener('visibilitychange', function () {
//     document.title = document.visibilityState
// }, false)