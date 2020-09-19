require('../api/chat_api')
import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../components/chat/ChatPage'

const titleSite = 'LightChat.com'


ReactDOM.render(
    <ChatPage value={titleSite}/>, 
    document.getElementById('root')
)