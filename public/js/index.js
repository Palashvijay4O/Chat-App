import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from  '../components/App';
const socket = io()


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)


require('../api/index_api')