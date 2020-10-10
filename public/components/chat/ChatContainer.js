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
    componentDidMount() {
        document.querySelector('a[aria-selected="true"]').style.backgroundColor = '#4aa1ff';
    }
    componentWillUnmount() {
        this.socket.disconnect()
    }
    render() {
        return (
            <div className="main-container">
                <div className="chat">
                    <Tabs onSelect={(key) => {
                        const allkeys = ['users', 'chat', 'settings']
                        console.log(key);
                        allkeys.forEach((allkey) => {
                            if(allkey === key) {
                                document.querySelector('#uncontrolled-tab-tab-' + allkey).style.backgroundColor = '#4aa1ff';
                            }
                            else {
                                document.querySelector('#uncontrolled-tab-tab-' + allkey).style.backgroundColor = '';
                            }
                        })
                    }} defaultActiveKey="chat" id="uncontrolled-tab">
                    <Tab eventKey="users" title="Users" >
                        <SideBar room={this.state.room} users={this.state.users}/>
                    </Tab>
                    <Tab eventKey="chat" title="Chat" >
                        <MessagesContainer socket={this.socket}/>
                    </Tab>
                    <Tab eventKey="settings" title="Preferences">
                        <div></div>
                    </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default ChatContainer;