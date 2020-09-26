import React from 'react';
import {getInviteDetails} from '../../api/api';

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            room: '',
            isReadOnly: false
        }
        
        var id = location.href.substr(location.href.indexOf('?q='))
        
        if(id !== '/') {
            const roomDetails = getInviteDetails(id).then((response) => {
                console.log("Response", response);
                this.setState({room: response.room, isReadOnly: true})
            })
        }
    }
    
    render() {
        return (
            <div className="centered-form__box">
                <h3>Join</h3>
                <form id="loginForm" action="/chat.html" method="post">
                    <label>Display Name</label>
                    <input type="text" name="username" placeholder="Display Name" required autoComplete="off"/>
                    <label>Room Name</label>
                    <input id="room-name" type="text" name="room" placeholder="Room" required readOnly={this.state.isReadOnly} autoComplete="off" defaultValue={this.state.room}/>
                    <button type="submit">Join</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;