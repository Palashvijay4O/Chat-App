import React from "react";
import ReactDOM from 'react-dom';
import App from  '../components/index/App';

// const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

ReactDOM.render(
    <App />, 
    document.getElementById('root')
)


document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})