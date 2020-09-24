import React from "react";
import ReactDOM from 'react-dom';
import App from  '../components/index/App';

// const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

ReactDOM.render(
    <App />, 
    document.getElementById('root')
)

// window.onload = (event) => {
//     document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
//     document.querySelector('.main-container').style.setProperty('display', 'flex');
// }

// window.addEventListener('resize', (event) => { 
//     document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
// })


document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})

//require('../api/index_api')