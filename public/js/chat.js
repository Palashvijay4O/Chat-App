import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../components/chat/ChatPage'

const titleSite = 'EasyPing'


ReactDOM.render(
    <ChatPage value={titleSite}/>, 
    document.getElementById('root')
)

require('../api/chat_api')