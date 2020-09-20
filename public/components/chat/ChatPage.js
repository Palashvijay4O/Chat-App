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
        else {
            event.stopPropagation()
        }
    }

    render() {
        return (
            <div className="banner">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Header value={this.props.value}/>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary btn-md" onClick={this.handleClick}>Invite</button>
                                    <button type="button" className="btn btn-danger btn-md" onClick={this.handleClick}>Exit</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        )
    }
}


export default ChatPage;