require('../api/chat_api')
const socket = io()
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header'

const titleSite = 'LightChat.com'

class ChatPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        
        event.preventDefault()
        var userInput = confirm('Do you want to leave this page??');
        if(userInput) {
        event.target.setAttribute('clicked', true)
        socket.emit('disconnet')
        location.href = '/'
        return;
    }
    }
    render() {
        return (
            <div className="banner">
                <Header value={titleSite}/>
                <button onClick={this.handleClick}>Exit</button>
            </div>
        )
    }
}

ReactDOM.render(
    <ChatPage />, 
    document.getElementById('root')
)