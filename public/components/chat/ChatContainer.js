import React from 'react';
import SideBar from './SideBar'

const username = localStorage.getItem('username')
const room = localStorage.getItem('room')

class ChatContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: '',
            users: []
        }

        this.socket = io()

        this.socket.on('roomData', ({room, users}) => {
            // const html = Mustache.render(sideBarTemplate, {
            //     room,
            //     users
            // })
            // $sidebar.innerHTML = html
            console.log(room);
            console.log(users)
            this.setState({room: room, users: users});
        })

        this.socket.emit('join', {username, room}, (error) => {
            if(error) {
                alert(error)
                location.href = '/'
            }
        })
    }
    render() {
        return (
            <div className="main-container">
                <div className="chat">
                    <SideBar room={this.state.room} users={this.state.users}/>
                    <div className="chat__main">
                        
                        <div id="messages" className="chat__messages">

                        </div>
                        <div id="user-typing-box" className="typing__message">
                                
                        </div>
                        
                        <div className="compose">
                            <form id="message-form">
                                <input id="message-box" type="text" name="messageTxt" placeholder="Type something...." required autoComplete="off"></input>
                                <button className="send-button"></button>
                            </form>
                            {/* <!-- <button id="send-location">Share Location</button> --> */}
                        </div>
                    </div>                
                </div>
            </div>
        )
    }
}

export default ChatContainer;