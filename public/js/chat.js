import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../components/chat/ChatPage'

const titleSite = 'EasyPing'

ReactDOM.render(
    <ChatPage value={titleSite}/>, 
    document.getElementById('root')
)


window.addEventListener('resize', () => { 
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
        document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
})

//require('../api/chat_api')