import React from 'react' 
import LoginForm from './LoginForm'


class Container extends React.Component {
    
    showList() {
        if(this.props.rooms.length === 0) {
            return (<h4>No Active Rooms Found</h4>)
        }

        return (<ul className="rooms">
                {
                    this.props.rooms.map(room => {
                        return (<li key={room} className="room-details">{room.roomName + '(' + room.participantsCount +')' }</li>)
                    })
                }
                </ul>)
    }

    render() {
        return (
            <div className="main-container">
                <div className="centered-form">
                    <LoginForm />
                </div>
                <div className="room-list" className='text-center'>
                    <h5>Active Rooms</h5>
                    <hr></hr>
                    {this.showList()}
                </div>
            </div>
        )
    }
}

export default Container;