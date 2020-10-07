import React from 'react';
import SideBar from './SideBar'
import MessagesContainer from './MessagesContainer'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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
        //console.log(typeof(this.socket))

        this.socket.on('roomData', ({room, users}) => {
            this.setState({room: room, users: users});
        })

        this.socket.emit('join', {username, room}, (error) => {
            if(error) {
                alert(error)
                location.href = '/'
            }
        })
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }
    render() {
        return (
            <div className="main-container">
                <div className="chat">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Users">
                        <SideBar room={this.state.room} users={this.state.users}/>
                    </Tab>
                    <Tab eventKey="profile" title="Chat">
                        <MessagesContainer socket={this.socket}/>
                    </Tab>
                    </Tabs>
                    {/* <SideBar room={this.state.room} users={this.state.users}/>
                    <MessagesContainer socket={this.socket}/> */}
                </div>
            </div>
        )
    }
}

export default ChatContainer;