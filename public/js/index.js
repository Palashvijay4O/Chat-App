import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from  '../components/index/App';
import MobileApp from  '../components/index/MobileApp';
const socket = io()

const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

ReactDOM.render(
    isMobileAgent ? <MobileApp />: <App /> , 
    document.getElementById('root')
)
require('../api/index_api')