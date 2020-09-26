import React from 'react';

var $messages;

class MessagesContainer extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }
        this.socket = this.props.socket

        this.socket.on('message', (message) => {
            const messageObj = {
                username: message.username,
                text: message.text,
                createdAt: moment(message.createdAt).format('h:mm a')
            }
            this.setState({
                messages: [...this.state.messages, messageObj]
            })
            this.autoScroll()
        })

        this.handleSend = event => {
            event.preventDefault()
            let message = event.target.elements.messageTxt.value;
            if (message === '')
                return;
            document.getElementById('send-button').setAttribute('disabled', 'disabled')
            this.socket.emit('sendMessage', message, (error) => {
                document.getElementById('send-button').removeAttribute('disabled')
                document.querySelector('#message-box').value = '';

                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                    document.activeElement.blur()
                else
                    document.querySelector('#message-box').focus()
                 
                if(error) {
                    return console.log(error)
                }
            });
        }
    }

    componentDidMount() {
        $messages = document.querySelector('#messages')
    }

    autoScroll() {
        // New message element
    
        const $newMessage =  $messages.lastElementChild
        
        // height of new message 
        const newMessageStyles = getComputedStyle($newMessage)
        const newMessageMargin = parseInt(newMessageStyles.marginBottom)
        const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
        // Visible height
        const visibleHeight = $messages.offsetHeight
    
        // Height of message container
        const containerHeight = $messages.scrollHeight
    
        // How far I have scrolled
        const scrollOffSet = $messages.scrollTop + visibleHeight
    
        if(containerHeight - newMessageHeight <= scrollOffSet) {
            $messages.scrollTop = $messages.scrollHeight
        }
    }

    render() {
        return (
            <div className="chat__main">
                    <div id="messages" className="chat__messages">
                        {this.state.messages.map((message, i) => {
                            return (
                                <div key={i} className="message">
                                    <p>
                                        <span className="message__name">{message.username}</span>
                                        <span className="message__meta">{message.createdAt}</span>
                                    </p>
                                    <p>{message.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div id="user-typing-box" className="typing__message"> </div>
                            
                    <div className="compose">
                        <form id="message-form" onSubmit={this.handleSend}>
                            <input id="message-box" type="text" name="messageTxt" placeholder="Type your message..." required autoComplete="off"></input>
                            <button id="send-button" className="send-button"></button>
                        </form>
                        {/* <!-- <button id="send-location">Share Location</button> --> */}
                    </div>
            </div>
        )
    }
}

export default MessagesContainer;