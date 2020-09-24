import React from 'react' 
import LoginForm from './LoginForm'


class Container extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="centered-form">
                    <LoginForm />
                </div>
                <div className="room-list" className='text-center'>
                    <h4>Active Rooms</h4>
                    <hr></hr>
                    <ul className="rooms">
                    {
                        this.props.rooms.map(room => {
                            return (<li key={room} className="room-details">{room.roomName + '(' + room.participantsCount +')' }</li>)
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Container;