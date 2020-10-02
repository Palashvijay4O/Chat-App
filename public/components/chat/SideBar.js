import React from 'react';

class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div id="sidebar" className="chat__sidebar">
                <h2 className="room-title">{this.props.room}</h2>
                <h3 className="list-title">Users</h3>
                 <ul className="users">{
                     this.props.users.map((user) => {
                         return <li key={user.username}><span>{user.username}</span></li>;
                     })
                 }
                </ul>
            </div>
        )
    }
}

export default SideBar;