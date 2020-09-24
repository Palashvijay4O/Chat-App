import React from 'react';
import Header from '../Header'
import Container from './Container'
//import io from 'socket.io-client'
//const socket = io()
const titleSite = 'EasyPing'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            room: '',
            roomsAndParticipants: []
        }
        this.socket = io('http://localhost:3000');

        this.socket.emit('getActiveRooms', () => {
            //console.log('emit')
        })
        
        this.socket.on('roomList', ({rooms}) => {
            //console.log("Rooms", rooms);
            this.setState({
                roomsAndParticipants: rooms
            })
        })
    }
    
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                <div className="banner">
                    <Header value={titleSite}/>
                </div>
                <div>
                    <Container rooms={this.state.roomsAndParticipants}/>
                </div>
            </div>
        )
    }
}

export default App;