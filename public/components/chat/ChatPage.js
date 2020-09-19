import React from 'react';
import Header from '../Header'
const socket = io()

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
                <div>
                    <Header value={this.props.value}/>
                </div>
                <div>
                    <button className="leave__button" onClick={this.handleClick}>Exit</button>
                </div>
            </div>
        )
    }
}


export default ChatPage;